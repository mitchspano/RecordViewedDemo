@IsTest
private class RecordViewedStampOptionsTest {
    @IsTest
    private static void getVisualEditorRows () {
        Exception myException;
        Test.startTest();
        try {
            VisualEditor.DesignTimePageContext context = new VisualEditor.DesignTimePageContext();
            context.entityName = 'Case';
            context.pageType = 'RecordPage';
            RecordViewedStampOptions options = new RecordViewedStampOptions(context);
            VisualEditor.DataRow defaultRow = options.getDefaultValue();
            VisualEditor.DynamicPicklistRows rows = options.getValues();
            System.assertNotEquals(null, defaultRow);
            System.assertNotEquals(null, rows);
        } catch (Exception e) {
            myException = e;
        }
        Test.stopTest();
        System.assertEquals(null, myException);
    }
}