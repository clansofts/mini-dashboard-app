import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FirebaseDbService } from '../../../common/core/services/firebase-db.service';


@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  photos: Observable<any[]>;
  isShow: boolean = false;

  constructor(private firebaseDbService: FirebaseDbService) { }

  ngOnInit() {
    this.isShow = false;

    this.photos = this.firebaseDbService.readPublicAlbum();

    this.photos.subscribe((response) => {
      this.isShow = true;
    });
  }

}
