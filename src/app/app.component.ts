import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  albums = [];
  discs: Array<any> = [];
  currentAlbum: any;

  constructor(public http: Http ){
  }

  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};


  afterChange(e) {
    console.log(e);
    this.currentAlbum = this.albums[e.currentSlide];
  }

  bubble_Sort(a, attr)
  {
    var swapp;
    var n = a.length-1;
    var x=a;
    do {
        swapp = false;
        for (var i=0; i < n; i++)
        {
            if (x[i][attr] < x[i+1][attr])
            {
               var temp = x[i];
               x[i] = x[i+1];
               x[i+1] = temp;
               swapp = true;
            }
        }
        n--;
    } while (swapp);
    return x;
  }

  ngOnInit(){

    this.http.get("https://jsonplaceholder.typicode.com/photos").subscribe(
      result =>{
        var aux = result.json();
        aux = this.bubble_Sort(aux,"albumId");
        var pos = 0;
        for(let i = 0 ; i < 3 ; i ++){
          var album = aux.filter(function(obj){
             return obj.albumId == aux[pos].albumId;
          })
          album= this.bubble_Sort(album, "id");
          var albumPhotos = {
            albumPhoto1:album[0],
            albumPhoto2:album[1]
          }
          this.albums.push(albumPhotos);
          pos += album.length;
        }
        console.log(this.albums);
        this.currentAlbum = this.albums[0];
      }
    );
  }
}
