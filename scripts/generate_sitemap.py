from pathlib import Path
import re
from datetime import date

BASE_URL = "https://wells-mo.ru"
ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "client/src/lib/site-content.ts"
OUTPUT = ROOT / "client/public/sitemap.xml"

text = CONTENT.read_text(encoding="utf-8")

service_slug_aliases = {
    "chistka-kolodcev": "/cleaning/",
    "remont-kolodcev": "/repair/",
    "gidroizolyaciya-shvov": "/seam-sealing/",
    "skobirovanie-kolodca": "/stapling/",
    "uglublenie-kolodcev": "/uglublenie-kolodcev/",
    "kopka-kolodcev": "/kopka-kolodcev/",
    "septik-iz-zhbi-kolec": "/septik-iz-zhb-kolec/",
    "drenazhnyy-kolodec": "/drenazhnyy-kolodec/",
    "vodosnabzhenie-iz-kolodca-v-dom": "/vodoprovod-iz-kolodca-v-dom/",
}

service_slugs = re.findall(r'slug: "([a-z0-9-]+)"', text)
service_slugs = [slug for slug in service_slugs if slug in service_slug_aliases]
service_slugs = list(dict.fromkeys(service_slugs))

translit = {
    'а': 'a','б': 'b','в': 'v','г': 'g','д': 'd','е': 'e','ё': 'e','ж': 'zh','з': 'z','и': 'i','й': 'y','к': 'k','л': 'l','м': 'm','н': 'n','о': 'o','п': 'p','р': 'r','с': 's','т': 't','у': 'u','ф': 'f','х': 'h','ц': 'c','ч': 'ch','ш': 'sh','щ': 'sch','ы': 'y','э': 'e','ю': 'yu','я': 'ya','ь': '','ъ': ''
}


def slugify(value: str) -> str:
    return re.sub(r'-+', '-', re.sub(r'\s+', '-', ''.join(translit.get(ch, ch) for ch in value.lower())).strip()).strip('-')


def ensure_trailing_slash(path: str) -> str:
    if path == "/":
        return path
    return path if path.endswith("/") else f"{path}/"


city_names = [
    "Балашиха","Ногинск","Бронницы","Власиха","Воскресенск","Восход","Долгопрудный","Домодедово","Дубна","Жуковский","Звёздный городок","Кашира","Клин","Коломна","Королёв","Котельники","Красногорск","Краснознаменск","Видное","Лобня","Лосино-Петровский","Лыткарино","Люберцы","Молодёжный","Мытищи","Наро-Фоминск","Нахабино","Новая Рига","Одинцово","Орехово-Зуево","Павловская Слобода","Павловский Посад","Подольск","Пушкино","Реутов","Рублёвка","Сергиев Посад","Серпухов","Солнечногорск","Ступино","Дедовск","Талдом","Фрязино","Химки","Барвиха","Черноголовка","Щёлково","Электросталь","Звенигород"
]

district_names = [
    "Волоколамск","Дмитров","Егорьевск","Зарайск","Истра","Лотошино","Луховицы","Можайск","Раменское","Руза","Серебряные Пруды","Чехов","Шатура","Шаховская"
]

priority_city_slugs = ["odincovo", "krasnogorsk", "nahabino", "novaya-riga", "rublevka", "barviha", "zvenigorod", "dedovsk", "pavlovskaya-sloboda"]

# Static pages with custom priorities
static_urls = {
    "/": ("1.0", "weekly"),
    "/uslugi/": ("0.9", "weekly"),
    "/price/": ("0.9", "weekly"),
    "/contacts/": ("0.8", "monthly"),
    "/nashi-raboty/": ("0.7", "monthly"),
    "/o-kompanii/": ("0.6", "monthly"),
    "/faq/": ("0.7", "monthly"),
    "/rajony-rabot/": ("0.8", "monthly"),
    "/cleaning/": ("0.9", "weekly"),
    "/repair/": ("0.9", "weekly"),
    "/seam-sealing/": ("0.8", "weekly"),
    "/stapling/": ("0.8", "weekly"),
    "/bottom-filter/": ("0.7", "weekly"),
    "/disinfection/": ("0.7", "weekly"),
}

urls = {}
for path, (prio, freq) in static_urls.items():
    urls[path] = (prio, freq)

for slug in service_slugs:
    p = service_slug_aliases[slug]
    urls.setdefault(p, ("0.9", "weekly"))

for name in city_names:
    path = ensure_trailing_slash(f"/goroda/{slugify(name)}")
    urls.setdefault(path, ("0.7", "monthly"))

urls.setdefault("/goroda/odintsovo/", ("0.7", "monthly"))

for name in district_names:
    path = ensure_trailing_slash(f"/rajony/{slugify(name)}")
    urls.setdefault(path, ("0.7", "monthly"))

for city_slug in priority_city_slugs:
    for service_slug in service_slugs:
        path = ensure_trailing_slash(f"/goroda/{city_slug}/{service_slug}")
        urls.setdefault(path, ("0.6", "monthly"))

today = date.today().isoformat()
sorted_urls = sorted(urls.items())

xml_parts = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for url_path, (prio, freq) in sorted_urls:
    xml_parts.append("  <url>")
    xml_parts.append(f"    <loc>{BASE_URL}{url_path}</loc>")
    xml_parts.append(f"    <lastmod>{today}</lastmod>")
    xml_parts.append(f"    <changefreq>{freq}</changefreq>")
    xml_parts.append(f"    <priority>{prio}</priority>")
    xml_parts.append("  </url>")
xml_parts.append("</urlset>")

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
OUTPUT.write_text("\n".join(xml_parts) + "\n", encoding="utf-8")
print(f"Generated {len(sorted_urls)} URLs in {OUTPUT}")
