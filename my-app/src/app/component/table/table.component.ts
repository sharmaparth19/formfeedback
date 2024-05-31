import { Component } from '@angular/core';
import { TableService } from '../../service/table.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    ReactiveFormsModule ,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  response: any[] = []
  id: any;
  selectedId: string | null = null;

  constructor(
    private tableservice: TableService,
    private router: Router
  ){}

  ngOnInit(){
    this.getFeedback()
  }

  onAddButtonClick() {
    this.router.navigate(['']); // Navigate to the ReactiveComponent
  }

  getFeedback(){
    this.tableservice.getDataFeedback().subscribe((res) => {
      this.response = res
      console.log(">>>>>>>>>>>>>>>",this.response)
    })
  }

  deleteFeedbackPost(id:string){
    this.tableservice.deleteFeedback(id).subscribe((res) => {
      console.log("sucessfully deleted")
      this.getFeedback()
      window.location.reload(); // Reload the page to refresh data
    })
  }

  // putEditFeedback(){
  //   this.tableservice.editFeedback(this)
  // }
}
