from django.contrib import admin
from .models import note

# Register your models here.
class NoteAdmin(admin.ModelAdmin):
    model=note
    list_display=('title','body')

admin.site.register(note,NoteAdmin)