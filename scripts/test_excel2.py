import openpyxl
import sys
import codecs

sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

file_path = r'd:\!PROJECTS\CONCURENTS\MANAGER\ТЗ на обработку выгрузки.xlsx'
wb = openpyxl.load_workbook(file_path, data_only=True)
sheet = wb.active

for i in range(5, 8):
    row = [str(cell.value) if cell.value is not None else "" for cell in sheet[i]]
    print(f"Row {i}: {row}")
