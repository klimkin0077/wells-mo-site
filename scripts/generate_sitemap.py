from pathlib import Path
import re

BASE_URL = "https://wells-mo.ru"
ROOT = Path("/home/ubuntu/premium-wells-site")
CONTENT = ROOT / "client/src/lib/site-content.ts"
OUTPUT = ROOT / "client/public/sitemap.xml"

text = CONTENT.read_text(encoding="utf-8")

service_slugs = re.findall(r'slug: "([a-z0-9-]+)"', text)
service_slugs = [slug for slug in service_slugs if slug in {
    "chistka-kolodcev",
    "remont-kolodcev",
    "kopka-kolodcev",
    "septik-iz-zhbi-kolec",
    "uglublenie-kolodcev",
    "vodosnabzhenie-iz-kolodca-v-dom",
}]
service_slugs = list(dict.fromkeys(service_slugs))

city_slugs = re.findall(r'\["([А-Яа-яA-Za-zЁё\-\s]+)",\s*"[^"]+"\]', text)
translit = {
    'а': 'a','б': 'b','в': 'v','г': 'g','д': 'd','е': 'e','ё': 'e','ж': 'zh','з': 'z','и': 'i','й': 'y','к': 'k','л': 'l','м': 'm','н': 'n','о': 'o','п': 'p','р': 'r','с': 's','т': 't','у': 'u','ф': 'f','х': 'h','ц': 'c','ч': 'ch','ш': 'sh','щ': 'sch','ы': 'y','э': 'e','ю': 'yu','я': 'ya','ь': '','ъ': ''
}

def slugify(value: str) -> str:
    return re.sub(r'-+', '-', re.sub(r'\s+', '-', ''.join(translit.get(ch, ch) for ch in value.lower())).strip()).strip('-')

city_names = [
    "Балашиха","Ногинск","Бронницы","Власиха","Воскресенск","Восход","Долгопрудный","Домодедово","Дубна","Жуковский","Звёздный городок","Кашира","Клин","Коломна","Королёв","Котельники","Красногорск","Краснознаменск","Видное","Лобня","Лосино-Петровский","Лыткарино","Люберцы","Молодёжный","Мытищи","Наро-Фоминск","Одинцово","Орехово-Зуево","Павловский Посад","Подольск","Пушкино","Реутов","Сергиев Посад","Серпухов","Солнечногорск","Ступино","Талдом","Фрязино","Химки","Черноголовка","Щёлково","Электросталь"
]
district_names = [
    "Волоколамск","Дмитров","Егорьевск","Зарайск","Истра","Лотошино","Луховицы","Можайск","Раменское","Руза","Серебряные Пруды","Чехов","Шатура","Шаховская"
]
priority_city_slugs = ["odincovo", "krasnogorsk", "himki", "mytischi", "solnechnogorsk", "lobnya"]

urls = {
    "/",
    "/uslugi",
    "/ceny",
    "/nashi-raboty",
    "/o-kompanii",
    "/faq",
    "/rajony-rabot",
    "/kontakty",
}

for slug in service_slugs:
    urls.add(f"/{slug}")

for name in city_names:
    urls.add(f"/goroda/{slugify(name)}")

for name in district_names:
    urls.add(f"/rajony/{slugify(name)}")

for city_slug in priority_city_slugs:
    for service_slug in service_slugs:
        urls.add(f"/goroda/{city_slug}/{service_slug}")

sorted_urls = sorted(urls)

xml_parts = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for path in sorted_urls:
    xml_parts.append("  <url>")
    xml_parts.append(f"    <loc>{BASE_URL}{path}</loc>")
    xml_parts.append("    <changefreq>weekly</changefreq>")
    xml_parts.append("    <priority>0.8</priority>")
    xml_parts.append("  </url>")
xml_parts.append("</urlset>")

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
OUTPUT.write_text("\n".join(xml_parts) + "\n", encoding="utf-8")
print(f"Generated {len(sorted_urls)} URLs")
