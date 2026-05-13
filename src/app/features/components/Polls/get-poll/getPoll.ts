import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PollService } from '../../../../services/poll.service';
import { PollInterface } from '../../../../interfaces/poll.interface';
import { ApiReponse } from '../../../../interfaces/api-reponse';
import { App } from '../../../../app';
import { ChoiceInterface } from '../../../../interfaces/choice.interface';

@Component({
  selector: 'app-get-poll',
  imports: [],
  templateUrl: './getPoll.html',
  styleUrl: './getPoll.css',
})
export class GetPollComponent implements OnInit {
  polls: PollInterface[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private pollService: PollService,
    public app: App,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.fetchPolls();
  }

  fetchPolls(): void {
    this.isLoading = true;

    this.pollService.getPolls(this.app.urlAPI()).subscribe({
      next: (response: ApiReponse) => {
        if (response.status === 'ok') {
          this.polls = response.result.filter((p: PollInterface) => p.is_active);
        }
        setTimeout(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        }, 0);
      },
      error: (err) => {
        setTimeout(() => {
          this.errorMessage = 'Erreur lors de la récupération des sondages.';
          this.isLoading = false;
          this.cdr.detectChanges();
        }, 0);
      },
    });
  }

  onVote(pollId: number | undefined, choice: ChoiceInterface): void {
    if (!pollId || !choice.id) {
      console.error('Données de vote incomplètes');
      return;
    }

    console.log(`Vote pour le sondage n°${pollId}`);
    console.log(`Label du choix : ${choice.label} (ID: ${choice.id})`);

    alert(`Merci d'avoir voté pour : ${choice.label}`);
  }
}
