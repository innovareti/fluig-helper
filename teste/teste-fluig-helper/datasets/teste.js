function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();  
	
	try{   
        
        var testeConstraint = null
        if (constraints != null) {
            for (var i = 0; i < constraints.length; i++) {
                
                if (constraints[i].fieldName == "teste_fonte") {
                    testeConstraint = constraints[i].initialValue
                } 

            }
        }
	    
        var constraintsDataset = new Array();
        if (testeConstraint != undefined && testeConstraint != "" && testeConstraint != null) {
            constraintsDataset.push(DatasetFactory.createConstraint('teste_fonte', testeConstraint, testeConstraint, ConstraintType.MUST));
        }

        var dsSolicitacao = DatasetFactory.getDataset('teste', null, constraintsDataset, null);

        log.info("LINHAS: " + dsSolicitacao.rowsCount)
        if (dsSolicitacao.rowsCount > 0) {
            
            dataset.addColumn('teste');
            
            for (var j = 0; j < dsSolicitacao.rowsCount; j++) {
                dataset.addRow([
                    
                    dsSolicitacao.getValue(j, 'teste_fonte'),
                    
                ]);
            }
        }

        return dataset;

    } catch (error) {

        dataset.addColumn('mensagem');
        dataset.addRow(['erro:' + error.message + ' at line ' + error.line]);

    }

} function onMobileSync(user) {

}