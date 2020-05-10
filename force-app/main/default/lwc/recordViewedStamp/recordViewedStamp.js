import { LightningElement, wire, api, track } from 'lwc';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';


export default class RecordViewedStamp extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api targetDateTimeField;
    @track _myFields;
    _userId = Id;
    _wiredResponse;

    connectedCallback() {
        if (this.targetDateTimeField && this.objectApiName) {
            this._myFields = [];
            this._myFields.push(this.objectApiName + '.' + this.targetDateTimeField);
            this._myFields.push(this.objectApiName + '.OwnerId');
        }
    }

    @wire(getRecord, {recordId : '$recordId', optionalFields : '$_myFields'})
    wiredRecord(response) {
        this._wiredResponse = response;
        if (response.error) {
            let message = 'Unknown Error';
            if (Array.isArray(response.error.body)) {
                message = response.error.body.map((e) => e.message).join(', ');
            } else if (typeof response.error.body.message === 'string') {
                message = response.error.body.message;
            }
            console.log('Error while trying to get the current owner and viewed date/time : ' + message);
        } else if (response.data) {
            let owner;
            let viewedDateTime;
            if (response.data && response.data.fields && response.data.fields.OwnerId &&response.data.fields.OwnerId.value) {
                owner = response.data.fields.OwnerId.value;
            }
            if (response.data && response.data.fields && response.data.fields[this.targetDateTimeField] &&response.data.fields[this.targetDateTimeField].value) {
                viewedDateTime = response.data.fields[this.targetDateTimeField].value;
            }
            if (!viewedDateTime && (this._userId === owner)) {
                this.setViewedDateTime();
            }
        }

    }


    setViewedDateTime() {
        let fields = {};
        fields['Id'] = this.recordId;
        fields[this.targetDateTimeField] = new Date().toISOString();
        let input = { fields };
        updateRecord(input)
        .then(() => {
            eval("$A.get('e.force:refreshView').fire();");
        })
        .catch(error => {
            console.log('Error while trying to set the Viewed Date/Time');
        })
    }

}