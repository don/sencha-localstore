/*global Ext */
Ext.setup({
    onReady: function() {
        Ext.regModel('Person', {
            fields: [
                {name: 'id', type: 'string'},    
                {name: 'name', type: 'string'}
            ]
        });

        var itemTemplate = new Ext.XTemplate(
            '<tpl for=".">',
            	'{name}',
            '</tpl>');

        var localStore = new Ext.data.Store({
            model: "Person",
            proxy: {
                type: 'localstorage',
                id: 'people'
            },
            root: 'people',
            autoLoad: true
        });
                
        var localPanel = {
            title: "Local Storage",
            items: [
                {
                    xtype: 'list',
                    store: localStore,
                    itemTpl:itemTemplate,
                    singleSelect: true
                }
            ]
        };
        
        var form = new Ext.form.FormPanel({
            title: "Add Record",
            items: [
                    {
                        xtype: 'textfield',
                        name: 'id',
                        label: 'ID',
                        placeHolder: 'auto increment'
                    },                    
                    {
                        xtype: 'textfield',
                        name: 'name',
                        label: 'Name'
                    },
                    {
                        id: 'savePersonButton',                        
                        xtype: 'button',
                        text: 'Save',
                        style: 'margin: .5em',
                        handler: function(){
                            // No idea if this is the "right" way to do this
                            // Almost works, but doesn't populate ID from form
                            var record = Ext.ModelMgr.create({}, 'Person');                            
                            form.updateRecord(record);
                            localStore.add(record);
                            localStore.sync();
                            // assumes success
                            form.reset();                            
                            Ext.getCmp('tabPanel').setActiveItem(0);
                        }                        
                    }
                ]
        });
        
        var panel = new Ext.TabPanel({
           id: 'tabPanel',
           tabBar: {
               layout: {
                   pack: 'center'
               }
           },
           fullscreen: true,
           cardSwitchAnimation: 'slide',
           items: [localPanel, form] 
        });
    }
});