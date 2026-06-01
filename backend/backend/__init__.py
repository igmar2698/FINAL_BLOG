import pymysql
pymysql.install_as_MySQLdb()

# Python 3.14 ve Django 4.2 Uyumsuzluğunu Çözen Sihirli Yama:
import django.template.context

def patched_context_copy(self):
    # Şablon kopyalama işlemini Python 3.14'ün anlayacağı şekle çeviriyoruz
    duplicate = object.__new__(self.__class__)
    duplicate.__dict__ = self.__dict__.copy()
    duplicate.dicts = self.dicts[:]
    return duplicate

django.template.context.BaseContext.__copy__ = patched_context_copy