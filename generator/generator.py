# -*- coding: utf-8 -*-

import frontmatter
import glob
from typing import List
import os
from os import path
from bs4 import BeautifulSoup, Tag
from tinydb import TinyDB, Query


os.chdir(path.dirname(path.dirname(__file__)))
TERMS_LIST_TEMPLATE = BeautifulSoup(open('generator/terms_list.html',
                                         'r', encoding='utf-8').read(),  features="html.parser")
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
    post = frontmatter.load(path)
    post.content = BeautifulSoup(post.content, features="html.parser")
    return post


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

    all_a = post.content.select(f'a[href^={NEW_TERM_MARK}]')
    return [create_li(post.content, a, post['ID']) for a in all_a]


def insert_li_to_list(content: BeautifulSoup, li_list: List[Tag])->BeautifulSoup:
    if 'terms_div' not in content:
        content = BeautifulSoup(str(content) + str(TERMS_LIST_TEMPLATE), features="html.parser")

    ul = content.find_all('ul', class_='terms_list')
    if len(ul) == 0:
        raise "Error adding list"
    if len(ul) > 1:
        print("There are more then 1 ul")

    ul = ul[0]

    for l in li_list:
        ul.append(l)

    return content


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


def regenerate_terms_page():
    post = get_post('_pages/terms.md')
    post.content = BeautifulSoup(open('generator/terms_page.html',
                                      'r', encoding='utf-8').read(),  features="html.parser")
    id = post['ID']
    ul = post.content.find('ul', class_='terms_list')
    for term in sorted(db.all(), key=lambda t: t['title']):
        li = post.content.new_tag('li')
        li['term'] = term["name"]
        li['id'] = f'{id}_{term["name"]}'
        li.append(BeautifulSoup(
            f'<strong>{term["title"]}</strong>- {term["description"]}.', features="html.parser"))

        ul.append(li)

    rewrite_post('_pages/terms.md', post)


if __name__ == "__main__":

    posts = {p: get_post(p) for p in get_md_in_folder("_posts")}

    for path, post in posts.items():
        new_terms_li = get_new_terms_as_li(post)
        if len(new_terms_li) > 0:
            post.content = insert_li_to_list(post.content, new_terms_li)
            post.content = replace_all_terms_links(post)

        post.content = update_terms_list(post)
        rewrite_post(path, post)

    regenerate_terms_page()
