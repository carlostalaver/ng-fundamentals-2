import { Directive, OnInit, Inject, ElementRef, forwardRef, Input } from "@angular/core";
import { JQ_TOKEN } from './jQuery.service';

@Directive({
  selector: '[modal-trigger]'
})
export class ModalTriggerDirective  implements OnInit {

  private el: HTMLElement;
  // tslint:disable-next-line:no-input-rename
  @Input('modal-trigger') modalId: string;

constructor(@Inject(forwardRef(() => ElementRef)) private ref: ElementRef , @Inject(JQ_TOKEN) private $: any) {
  this.el = ref.nativeElement;
}
  ngOnInit() {
    this.el.addEventListener('click', e => {
      this.$(`#${this.modalId}`).modal({});
    });

  }
}
