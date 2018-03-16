import { Component, OnInit } from '@angular/core';
import { NewsfeedService } from './shared/newsfeed.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css'],
  providers: [NewsfeedService]
})
export class NewsfeedComponent implements OnInit {
  newsfeedListArray: any[];
  constructor(private newsfeedService: NewsfeedService) { }

  ngOnInit() {
  	this.newsfeedService.getNewsfeedList().snapshotChanges().subscribe(item => {
  		this.newsfeedListArray = [];
  		item.forEach(element => {
  			var x = element.payload.toJSON();
  			x["$key"] = element.key;
  			this.newsfeedListArray.push(x);
  		})

  		//sort 
  		  this.newsfeedListArray.sort((a,b) => {
  		  	let a_date = new Date(a.date);
          let b_date = new Date(b.date);
          return b_date.getTime() - a_date.getTime();
  		  })
  	});
  }

  onAdd(itemTitle, itemDate) {
  	this.newsfeedService.addEntry(itemTitle.value, itemDate.value);
  	itemTitle.value = null;
  }

  onDelete($key: string) {
    this.newsfeedService.removeEntry($key);
  }

}
