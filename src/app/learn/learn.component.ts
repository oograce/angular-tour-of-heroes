import {Component, DoCheck, OnInit} from '@angular/core';
import {KvWatcher, IterWatcher, NgxWatcherService} from 'ngx-watcher';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit, DoCheck {
  private kvWatcher: KvWatcher<any>;
  private iterWatcher: IterWatcher<any>;
  value = {
    name: 'siye',
    age: 18
  };
  array = [1, 2, 3, 4, 5];
  objArray = [
    {
      name: 'siye',
      age: 18
    }, {
      name: '小明',
      age: 20
    }];
  constructor(
    private service: NgxWatcherService
  ) {
    this.kvWatcher = service.of(this.value);
    this.iterWatcher = service.ofIter(this.array);
  }

  ngOnInit() {
  }

  ngDoCheck(): void {
    this.kvWatcher.watch(
      this.value,
      v => console.log(`change after value:`, v),
      (t, v) => console.log(`changed value: WatchChangeType=${t} ${v.key} ${v.previousValue} ${v.currentValue}`)
    );

    this.iterWatcher.watch(
      this.array,
      v => console.log(`change after value:`, v),
      (t, v) => console.log(`changed value: WatchChangeType=${t} ${v.currentIndex} ${v.item} ${v.previousIndex} ${v.trackById}`)
    );

    this.kvWatcher.watch(
      this.objArray,
      v => console.log(`change after value:`, v),
      (t, v) => console.log(`changed value: WatchChangeType=${t} ${v.key} ${v.previousValue} ${v.currentValue}`)
    );
  }

  add() {
    this.array.push(6);
  }

  change() {
    this.array[2] = 1000;
  }

  changeArrayList() {
    this.objArray[1].name = '小红';
  }
}
