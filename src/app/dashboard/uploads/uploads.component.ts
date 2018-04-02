import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {

  isShow: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onNavigate(option: boolean) {
    this.isShow = option;

    option
      ? this.router.navigate(['u1'], { relativeTo: this.route, skipLocationChange: true })
      : this.router.navigate(['u0'], { relativeTo: this.route });
  }

}
