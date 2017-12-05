import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 're-captcha',
    template: '<div class="g-recaptcha" [attr.data-sitekey]="sitekey" data-callback="verified"></div>'
})

export class recaptcha implements OnInit {

   sitekey:string = '6LekkTsUAAAAALYft1VnYNym3Z9pFQNNQe6V_7Yb';
    @Output() tokenChange = new EventEmitter();

    ngOnInit(){
        this.render();
        window['verified'] = (response) => this.verified(response)
    }

    render(){
        var script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        console.log("render");
    }

    verified(response){
        console.log("response.token");
        console.log(response);
        // var requestParamToSiteVerify = {"googleReCaptchaRequest":{"token":response}}
        this.tokenChange.emit({
            token: response
        })
    }
}