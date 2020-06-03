import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import MediumEditor from 'medium-editor';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  
})

export class DashboardComponent implements OnInit {
  protected email: string
  public editor: any;
  constructor(
    public auth: AuthService,
    public router: Router,
    public ngZone: NgZone,
    protected firestore: AngularFirestore,
  ) { }

  ngOnInit() { }
  
  getFirebase() {
    this.firestore.collection('pencil-assessment').doc(this.email).ref.get()
      .then(doc => {
        if (doc.exists) {
          this.editor.setContent(doc.data().value, 0)
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });

  }

  pushFirebase() {
    let newText = this.editor.getContent(0)
    this.firestore.collection('pencil-assessment').doc(this.email).ref.get()
      .then(doc => {
        this.firestore
          .collection('pencil-assessment')
          .doc(this.email)
          .set({ value: newText });
      })
  }

  @ViewChild('media') media: ElementRef;
  ngAfterViewInit() {
    this.email = this.auth.userData.email;
    this.getFirebase()
    const edit= this.media.nativeElement;
    this.editor = new MediumEditor(edit);
    this.editor.subscribe('editableInput', this.pushFirebase.bind(this));
  }
}
