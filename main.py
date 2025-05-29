import requests
from bs4 import BeautifulSoup
import gspread
from oauth2client.service_account import ServiceAccountCredentials

# Google Sheets setup
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)
client = gspread.authorize(creds)
sheet = client.open_by_url("https://docs.google.com/spreadsheets/d/e/2PACX-1vTkBqMzmH6zTSjJ13H16HQM61kxbnI6lSZwi4qIgMKoHbDW6s2RA9vN4Z_T4P95Ldt-7El11rcmjMkm/pub?output=csv")
worksheet = sheet.get_worksheet(0)

# Scrape data from a government site (example: https://pib.gov.in/)
url = "https://pib.gov.in/indexd.aspx?rel=0"
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

# Sample scraper logic (modify as per site structure)
items = soup.select(".content-area .media")
data = []

for item in items[:10]:  # limit to top 10 items
    title = item.select_one("a")
    title_text = title.text.strip() if title else "N/A"
    link = "https://pib.gov.in/" + title['href'] if title and title.has_attr('href') else ""
    data.append([title_text, "PIB News", "", link])

# Append data to sheet if not already present
existing_titles = [row[0] for row in worksheet.get_all_values()]
for row in data:
    if row[0] not in existing_titles:
        worksheet.append_row(row)