# -*- coding: utf-8 -*-

import frontmatter
import glob
from typing import List
import os
from os import path
from bs4 import BeautifulSoup, Tag
from tinydb import TinyDB, Query


os.chdir(path.dirname(path.dirname(__file__)))
TERMS_LIST_TEMPLATE = open('generator/terms_list.html',
                           'r', encoding='utf-8').read()
NEW_TERM_MARK = '###'
DEFAULT_DESCRIPTION = "עדיין אין פירוט למושג הזה"

db = TinyDB('generator/db.json', encoding='utf-8').table('Terms')
Terms = Query()


def get_term_by_name(name: str):
    name = name.lower()
    terms = db.search(Terms.name == name)

    if len(terms) == 0:
        return {
            "name": name,
            "description": DEFAULT_DESCRIPTION,
            "title": name
        }
    if len(terms) > 1:
        print(f'{term_name} appear in {len(terms)} times')
    return terms[0]


def get_post(path: str)->frontmatter.Post:
    return frontmatter.load(path)


def get_md_in_folder(folder: str)->List[str]:
    return glob.glob(f"{folder}/*.md")


def get_new_terms_as_li(post: frontmatter.Post)->List[Tag]:

    def create_li(soup: BeautifulSoup, a, id)->Tag:
        term_name = a["href"].replace(NEW_TERM_MARK, '')
        term = get_term_by_name(term_name)

        li = soup.new_tag('li')
        li['term'] = term["name"]
        li['id'] = f'{id}_{term["name"]}'
        li.append(BeautifulSoup(
            f'<strong>{term["title"]}</strong>- {term["description"]}.', features="html.parser"))

        return li

    soup = BeautifulSoup(post.content, features="html.parser")
    all_a = soup.select(f'a[href^={NEW_TERM_MARK}]')
    return [create_li(soup, a, post['ID']) for a in all_a]


def insert_li_to_list(content, li_list: List[Tag]):
    if 'terms_div' not in content:
        content = content + TERMS_LIST_TEMPLATE

    soup = BeautifulSoup(content, features="html.parser")
    ul = soup.find_all('ul', class_='terms_list')
    if len(ul) == 0:
        raise "Error adding list"
    if len(ul) > 1:
        print("There are more then 1 ul")

    ul = ul[0]

    for l in li_list:
        ul.append(l)

    return soup


def replace_all_terms_links(post: frontmatter.Post):
    for a in post.content.select(f'a[href^={NEW_TERM_MARK}]'):
        term = a['href'].replace(NEW_TERM_MARK, '').lower()
        a['href'] = f'#{post["ID"]}_{term}'
        a['term'] = term

    return post.content


def update_terms_list(post: frontmatter.Post):
    for l in post.content.find_all('li', term=True):
        term = get_term_by_name(l['term'])
        l.contents = BeautifulSoup(
            f'<strong>{term["title"]}</strong>- {term["description"]}.', features="html.parser")

    return post.content


def rewrite_post(path: str, post: frontmatter.Post):
    frontmatter.dump(post, path)


if __name__ == "__main__":

    posts = {p: get_post(p) for p in get_md_in_folder("_posts")}

    for path, post in posts.items():
        new_terms_li = get_new_terms_as_li(post)
        post.content = insert_li_to_list(post.content, new_terms_li)
        # all_terms_in_list = get_all_listed_terms(post.content)
        post.content = update_terms_list(post)
        post.content = replace_all_terms_links(post)
        rewrite_post(path, post)
