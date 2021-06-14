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

  potvrdiClick(): void {
    this.dialogRef.close(true);
  }
  odustaniClick(): void {
    this.dialogRef.close(false);
  }
}
