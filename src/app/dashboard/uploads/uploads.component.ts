import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {

  isShow: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const url = this.router.url;
    this.isShow = url.includes('u0') ? false : true;
  }

  onNavigate(option: boolean) {
    this.isShow = option;

    option
      ? this.router.navigate(['u1'], { relativeTo: this.route })
      : this.router.navigate(['u0'], { relativeTo: this.route });
  }

}
