import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Note } from './models/note.interface';
import { Observable } from 'rxjs';
import { NotesService } from './notes-service/notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'to-do app';
  notes$!: Observable<Note[]>;
  notePlaceholder = 'Exercise for 40 minutes';
  @ViewChild('addNoteInput')
  private addNoteInput!: ElementRef;

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.refreshNotes();
  }

  refreshNotes(): void {
    this.notes$ = this.notesService.notes$;
  }

  onAddNote(): void {
    const inputValue = this.addNoteInput.nativeElement.value;
    this.notesService.addNote(inputValue).subscribe({
      next: (success: boolean) => {
        if (!success) {
          console.log('Error adding the note, please try again');
          return;
        }
        this.refreshNotes();
      },
    });
  }

  onDeleteNote(noteId: string): void {
    this.notesService.deleteNote(noteId).subscribe({
      complete: () => this.refreshNotes(),
    });
  }
}
