Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'secuCode',
        fieldLabel: 'Security Code',
        saveToProfile: true,
        validate: function(value, errorFn) {
            if (value == '' || !/^\d+$/.test(value) || value.length < 4) {
                errorFn('Security Code must have a valid value with at least 4 digit numbers');
                return false;
            }
            return true;
        }
    },
    {
        fieldName: 'bank',
        fieldLabel: 'Bank Account Number',
        saveToProfile: false        
    }]
});