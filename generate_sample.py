
import os
import shutil

template_folder = "AnnArbor"
generate_names = [
        "Antibes",
        "Bergen",
        "Berkeley",
        "Berlin",
        "Boadilla",
        "boxes",
#         "CambridgeUS",
#         "Copenhagen",
#         "Darmstadt",
#         "default",
#         "Dresden",
#         "Frankfurt",
#         "Goettingen",
#         "Hannover",
#         "Ilmenau",
#         "JuanLesPins",
#         "Luebeck",
#         "Madrid",
#         "Malmoe",
#         "Marburg",
#         "Montpellier",
#         "PaloAlto",
#         "Pittsburgh",
#         "Rochester",
#         "Singapore",
#         "Szeged",
#         "Warsaw",
        ]

for name in generate_names:
    if os.path.exists(name):
        print(f"{name} folder exists, so skip to generate.")
        continue

    shutil.copytree(template_folder, name)
    print(f"{name} folder generated!")
    tex_path = os.path.join(name, "main.tex")

    with open(tex_path, "r", encoding="utf-8") as file:
        content = file.read()

    content = content.replace(rf"\def\beamertheme{{{template_folder}}}", rf"\def\beamertheme{{{name}}}")

    with open(tex_path, "w", encoding="utf-8") as file:
        file.write(content)

print("Generation Finished!")
