import { Injectable, ElementRef } from '@angular/core';

declare var $: any;
function closest(el, selector) {
    var matchesFn;

    // find vendor prefix
    ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
        if (typeof document.body[fn] == 'function') {
            matchesFn = fn;
            return true;
        }
        return false;
    })

    var parent;

    // traverse parents
    while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
            return parent;
        }
        el = parent;
    }

    return null;
}

@Injectable()
export class ModalService {
    private modals: any[] = [];

    constructor() {}

    public add(modal: any) { // add modal to array of active modals
        this.modals.push(modal);
    }

    public remove(id: string) { // remove modal from array of active modals
        let modalToRemove = this.modals.filter((modal, i) => {return modal.id === id; });
        if (modalToRemove && modalToRemove.length) {
          this.modals.splice(this.modals.indexOf(modalToRemove[0]), 1);
        }
    }

    public open(id: string) { // open modal specified by id
        let modalToOpen = this.modals.filter((modal) => {return modal.id === id; });
        if (modalToOpen && modalToOpen.length) {
          modalToOpen[0].open();
        }
    }

    public close(id: string) { // close modal specified by id
        let modalToClose = this.modals.filter((modal) => {return modal.id === id; });
        if (modalToClose && modalToClose.length) {
          modalToClose[0].close();
        }
    }

    public closeModalByChildElement(el: Element) {
        let modalElement = closest(el,'modal');
        if (modalElement) {
            this.close(modalElement.id);
        }
    }
}
