# -*- coding: utf-8 -*-

import opml
import glob
from bs4 import BeautifulSoup
import requests

exlude_titles = [
    'תוכנה - כללי',
    'פודקאסטים',
    'מיקרוסופט',
    'StackOverflow',
    'אחרים'
]


def fetch_website_title(url):
    site = requests.get(url)
    soup = BeautifulSoup(site.text, features="lxml")
    title = soup.title.text.strip() if soup.title is not None else ''
    print(title)
    return title


def parse_outline(outline: opml.OutlineElement) -> str:
    if len(outline) > 0:
        # print(outline.title)
        if outline.title in exlude_titles:
            return ''
        links = '\n'.join([f'<li>{parse_outline(o)}</li>' for o in outline])
        return f'<h3>{outline.title}</h3>\n<ul>\n{links}</ul>\n'

    feed_name = outline.title.strip() if hasattr(outline, 'title') else ''
    htmlUrl = outline.htmlUrl if hasattr(outline, 'htmlUrl') else '#'
    type_: str = outline.type if hasattr(outline, 'type') else ''
    xmlUrl = outline.xmlUrl if hasattr(outline, 'xmlUrl') else '#'

    website_title = fetch_website_title(htmlUrl) if htmlUrl != '#' else ''

    if website_title.startswith(feed_name):
        website_title = website_title.replace(feed_name, '', 1)

    return f'<a href="{htmlUrl}">{feed_name}</a>: {website_title} (<a href="{xmlUrl}">{type_}</a>).'


for opml_file in glob.glob('generator/data/*.opml'):
    opml_outline = opml.parse(opml_file)
    result = '\n'.join([parse_outline(o) for o in opml_outline])
    with open('result.txt', 'wb') as file:
        file.write(result.encode('utf-8'))
