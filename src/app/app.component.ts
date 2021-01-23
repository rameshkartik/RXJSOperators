import { Component } from '@angular/core';
import { Observable,fromEvent,of,Subscription,interval,Subject,merge,concat } from 'rxjs';
import { map,first,mergeMap,take,delay,distinct } from 'rxjs/operators';

// *************Map Operator ***********
console.log("RXJS Example 1 :  Operator Map");

map((x:number) => x * x)(of(1, 2, 3)).subscribe((v) => console.log(`Operator Map value: ${v}`));

console.log("RXJS Example 2 :  Operator First");

first()(of(6, 2, 3)).subscribe((v) => console.log(`Operator First value: ${v}`));
// *************Map Operator ***********


// *************Merge Operator ***********
console.log("RXJS Example 3 :  Operator Merge");

const clicks = fromEvent(document, 'click');
const timer = interval(1000);
const clicksOrTimer = merge(clicks, timer);
clicksOrTimer.subscribe(x => console.log(`Operator Merge Value :${x}`));
// *************Merge Operator ***********

// *************MergeMap Operator ***********
const letters = of('a', 'b', 'c');
const result = letters.pipe(
  mergeMap(x => interval(1000).pipe(map(i => x + String(i))),
));

result.subscribe(x => console.log(`Operator MergeMap Value :${x}`));
// *************MergeMap Operator ***********


//********Concat Operator */
const timer1 = interval(1000).pipe(take(10));
const timer2 = interval(2000).pipe(take(6));
const timer3 = interval(500).pipe(take(10));
 
const resultConcat = concat(timer1, timer2, timer3);
result.subscribe(x => console.log(`Operator Concat Value :${x}`));
//*******Concat Operator */


//*********Delay ********* */
const clicksDel = fromEvent(document, 'click');
const delayedClicks = clicksDel.pipe(delay(1000)); // each click emitted after 1 second
delayedClicks.subscribe(x => console.log(`Operator Delay Value :${x}`));
//********Delay************** */

//*********Distinct********* */
of(1, 1, 2, 2, 2, 1, 2, 3, 4, 3, 2, 1).pipe(
    distinct(),
  )
  .subscribe(x => console.log(`Operator Distinct Value :${x}`)); 
//*********Distinct*********** */


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'RXJSSamples';

  private subscriptions = [];

  private engNews$ = new Subject();
  private tamilNews$ = new Subject();
  private news$ = merge(this.engNews$, this.tamilNews$);

  ngOnInit(){
  
  this.subscriptions.push(this.news$.subscribe(console.log));

    this.engNews$.next({Category: 'Sports', News: 'India Won Test Cricket'});
    console.log(this.engNews$);
    this.engNews$.next({Category: 'Politics', News: 'Election dates announced'});
    console.log(this.engNews$);
    this.tamilNews$.next({Category: 'Sports', News: 'India Won Test Cricket'});
    console.log(this.tamilNews$);
    this.tamilNews$.next({Category: 'Politics', News: 'Election dates announced'});
    console.log(this.tamilNews$); 

  }

   ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
