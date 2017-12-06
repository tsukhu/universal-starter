import { Component } from "@angular/core";


@Component({
    selector: 'app-footer',
    styleUrls: ['./footer.component.scss'],
    templateUrl: './footer.component.html',
})
export class FooterComponent {
    changeLanguage() {
        localStorage.unlockapplang = localStorage.unlockapplang=='es'?'en':'es';
        location.reload(true);
    }
}
