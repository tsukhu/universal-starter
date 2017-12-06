import {by, element, browser} from 'protractor';

describe('Unlock Your Device', () => {
  
	it('Should open device unlock page', () => {
		browser.get('http://localhost:4200/');
		element(by.linkText('Unlock your device')).click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/#/device-unlock');
  });
  
    it('Should enter AT&T Wireless Number & Clicked Checkbox', () => {
		
		element(by.name('wirelessNumber')).sendKeys(1234567890);
		element(by.id('terms2')).click();
		expect(element(by.id('terms2')).isSelected()).toBeTruthy();
	}); 
	
	it('Should Validate AT&T Wireless Number', () => {
		element(by.name('wirelessNumber')).sendKeys(1234567890);
		 element(by.name('wirelessNumber')).getAttribute('value').then(function(text) {
			expect(text.length).toEqual(10);
		});
	}); 
	
    it('Should Reach Personal Info Page', () => {
		element(by.id('wNumNext')).click();   
		expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/#/unlockstep2;wirelessNumber=1234567890');
	
  });
  
    it('Should Fill Account Holders First Name', () => {	
		element(by.id('first_name')).sendKeys('Michell');
		expect(element(by.id('first_name')).getAttribute('value')).toEqual('Michell');
		
  });
  
    it('Should Fill Account Holders Last Name', () => {	
		element(by.id('last_name')).sendKeys('Johnson');
		expect(element(by.id('last_name')).getAttribute('value')).toEqual('Johnson');
		
  });
  
    it('Should Fill Account Holders passcode', () => {	
		element(by.id('passcode')).sendKeys('12345678');
		expect(element(by.id('passcode')).getAttribute('value')).toEqual('12345678');
		
  });  
  
    it('Should Fill Account Holders email id', () => {	
		element(by.id('email')).sendKeys('admin@att.com');
		expect(element(by.id('email')).getAttribute('value')).toEqual('admin@att.com');
		
  });    
  
	it('Should Fill Account Holders email id again', () => {	
		element(by.id('email_again')).sendKeys('admin@att.com');
		expect(element(by.id('email_again')).getAttribute('value')).toEqual('admin@att.com');
		
  });   
  
	it('Should Check both email address are same', () => {	
		expect(element(by.id('email')).getAttribute('value')).toEqual(element(by.id('email_again')).getAttribute('value'));
		
  });   
  
	it('Should Redirect to unlockstep3 page', () => {	
		element(by.id('accountInfoNext')).click();   
		expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/#/unlockstep3');
		
  });     
  
	it('Should Enter Valid IMEI Number', () => {	
		element(by.id('IMEI')).sendKeys('322765434587854');  
		 element(by.id('IMEI')).getAttribute('value').then(function(text) {
			expect(text.length).toEqual(15);
		});
		
  });     
  
    it('Should Submit the Order', () => {	
		element(by.id('unlockSubmit')).click();  
		expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/#/unlockConfirm;customerType=true');
		
  });     
  
  
});

describe('Check an Unlock status', () => {

	it('Should open unlock status page', () => {
		browser.get('http://localhost:4200/');
		element(by.linkText('Check an unlock status')).click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/#/unlock-status');
  });

	it('Should enter valid IMEI Number', () => {
		element(by.id('IMEI')).sendKeys('322765434587853');  
		 element(by.id('IMEI')).getAttribute('value').then(function(text) {
			expect(text.length).toEqual(15);
		});
  });
  
	it('Should enter valid Request Number', () => {
		element(by.id('req_num')).sendKeys('CUL71XXX1059703');  
		 element(by.id('req_num')).getAttribute('value').then(function(text) {
			expect(text.length).toEqual(10);
		});
  });
  
	it('Should reach current status page', () => {
		element(by.id('unlockCheck')).click();  
		expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/#/unlock-status-confirm;imeiNumber=322765434587853');
  });
});