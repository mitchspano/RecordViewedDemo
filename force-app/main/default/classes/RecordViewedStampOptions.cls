public class RecordViewedStampOptions extends VisualEditor.DynamicPicklist {

    VisualEditor.DesignTimePageContext context;

    public RecordViewedStampOptions(VisualEditor.DesignTimePageContext context) {
        this.context = context;
    }

    public override VisualEditor.DataRow getDefaultValue() {
        VisualEditor.DataRow returnValue = new VisualEditor.DataRow('none', 'NONE');
        return returnValue;
    }
    
    public override VisualEditor.DynamicPicklistRows getValues() {
        VisualEditor.DynamicPicklistRows returnValue = new VisualEditor.DynamicPicklistRows();
        sObjectType mysObjectType = Schema.getGlobalDescribe().get(this.context.entityName);
        Map<String, Schema.sObjectField> fields = mysObjectType.getDescribe().fields.getMap();
        for (Schema.sObjectField field : fields.values()) {
            if (field.getDescribe().isUpdateable() && String.valueOf(field.getDescribe().getType()).equals('DATETIME')) {
                returnValue.addRow(new VisualEditor.DataRow(field.getDescribe().getName(), field.getDescribe().getName()));
            }
        }
        return returnValue;
    }
}

