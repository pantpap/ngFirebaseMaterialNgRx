import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore'

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<any>;

  constructor(private trainingService: TrainingService, private db: AngularFirestore) { }

  ngOnInit() {
    this.exercises = this.db.collection('availableExercises').valueChanges(); 
    // this.exercises = this.trainingService.getAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
