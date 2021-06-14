import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Kontakt } from 'src/app/models/kontakt.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dialog-brisanje',
  templateUrl: './dialog-brisanje.component.html',
  styleUrls: ['./dialog-brisanje.component.scss']
})
export class DialogBrisanjeComponent implements OnInit {
  dataSource: MatTableDataSource<Kontakt>;
  kontaktID: any;
  contactForm: any;
  constructor(
    public apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<DialogBrisanjeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    overlayContainer: OverlayContainer
  ) { }
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      if (params.get('id') != null) {
        this.kontaktID = +params.get('id');
      }
    });
  }

  potvrdiClick() {

    this.apiService.getEmail(this.data.id).subscribe(res => {
      res.forEach((element) => {
        console.log(element.id);
        this.apiService.deleteEmail(element.id).subscribe(data => {
          console.log(data);
         });
      });
    });

    this.apiService.getTelefon(this.data.id).subscribe(res => {
      res.forEach((element) => {
        console.log(element.id);
        this.apiService.deleteTelefon(element.id).subscribe(data => {
          console.log(data);
         });
      });
    });

    setTimeout(() => {
      this.apiService.deleteKontakt(this.data.id)
        .subscribe(data => {
          this.dialogRef.close();
        });
    }, 2000);


    // this.apiService.getTelefon(this.data.id).subscribe(res => {
    //   res.forEach((element) => {
    //     this.apiService.deleteTelefon(element.id);
    //   });
    // });






  }
}
