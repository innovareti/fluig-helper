const command = {
    name: 'dataset',
    description: "Cria dataset básico",
    run: async toolbox => {
        const {
            parameters,
            template,
            filesystem,
            replaceExisting,
            dsValidation,
            print: { success, error, warning }
        } = toolbox

        // text input
        const askName = { type: 'input', name: 'name', message: 'Qual o nome do dataset a ser criado?' }
        const askResource = { type: 'input', name: 'dataset', message: 'Qual o dataset utilizado como fonte de dados?' }
        const askColunmName = { type: 'input', name: 'colunmName', message: 'Qual o nome da coluna?' }
        const askColunmNameDatasetBase = { type: 'input', name: 'colunmNameDatasetBase', message: 'Qual o nome da coluna do dataset fonte?' }
        // multiple choice
        const askColunm = {
            type: 'select',
            name: 'addColunm',
            message: 'O que deseja fazer?',
            choices: ['Add coluna', 'Finalizar'],
        }
        var answers = {}
        
        var datasetName = await dsValidation(askName)
        var baseDataset
        while (baseDataset == null || baseDataset == undefined || baseDataset == "") {

            answers = await toolbox.prompt.ask(askResource)
            regex = /^[A-Za-z0-9_]*[A-Za-z0-9_]*$/g
            if (regex.test(answers.dataset) && answers.dataset.length > 0){
                baseDataset = answers.dataset
            } else {

                msg = []
                regexMsg = / /g // procura espaços em branco
                if (regexMsg.test(answers.dataset)) {
                    msg.push("não utilize espaços")
                }
                regexMsg = /^[A-Za-z0-9_ ]*[A-Za-z0-9_ ]*$/
                if (!regexMsg.test(answers.dataset)){
                    msg.push("não utilize caracteres especiais")
                }
                if (!answers.colunmName.length > 0) {
                    warning("Esse campo não pode estar vazio")
                }
                msg = msg.join(", ")
                if(msg.length > 0) {
                    warning(`Dado inválido, por favor ${msg}`)
                }

            }

        }
        
        // Get colunms
        var colunms = []
        var colunmsDatasetBase = []
        answers.addColunm = ""
        answers.colunmName = ""
        answers.colunmNameDatasetBase = ""

        while (answers.addColunm != "Finalizar") {

            answers = await toolbox.prompt.ask(askColunm)
            if (answers.addColunm == "Add coluna") {
                answers = await toolbox.prompt.ask(askColunmName)
                regex = /^[A-Za-z0-9_]*[A-Za-z0-9_]*$/g
                if (regex.test(answers.colunmName) && answers.colunmName.length > 0){

                    colunms.push(answers.colunmName)
                    var num_atual_colunas = colunmsDatasetBase.length
                    while (colunmsDatasetBase.length <= num_atual_colunas) {    

                        answers = await toolbox.prompt.ask(askColunmNameDatasetBase)
                        console.log(answers.colunmNameDatasetBase)
                        regex = /^[A-Za-z0-9_]*[A-Za-z0-9_]*$/g
                        if (regex.test(answers.colunmNameDatasetBase) && answers.colunmNameDatasetBase.length > 0){
                            colunmsDatasetBase.push(answers.colunmNameDatasetBase)
                        } else {
                            msg = []
                            regex = / /g // procura espaços em branco
                            if (regex.test(answers.colunmNameDatasetBase)) {
                                msg.push("não utilize espaços")
                            }
                            regex = /^[A-Za-z0-9_ ]*[A-Za-z0-9_ ]*$/
                            if (!regex.test(answers.colunmNameDatasetBase)){
                                msg.push("não utilize caracteres especiais")
                            }
                            if (!answers.colunmNameDatasetBase.length > 0) {
                                warning("Esse campo não pode estar vazio")
                            }
                            msg = msg.join(", ")
                            if(msg.length > 0) {
                                warning(`Dado inválido, por favor ${msg}`)
                            }
                        }
                        
                    }
                    success("Colunas criadas: " + colunms.join(" || ")) 

                } else {

                    msg = []
                    regex = / /g // procura espaços em branco
                    if (regex.test(answers.colunmName)) {
                        msg.push("não utilize espaços")
                    }
                    regex = /^[A-Za-z0-9_ ]*[A-Za-z0-9_ ]*$/
                    if (!regex.test(answers.colunmName)){
                        msg.push("não utilize caracteres especiais")
                    }
                    if (!answers.colunmName.length > 0) {
                        warning("Esse campo não pode estar vazio")
                    }
                    msg = msg.join(", ")
                    if(msg.length > 0) {
                        warning(`Dado inválido, por favor ${msg}`)
                    }

                }
            } else if (colunms.length <= 0){
                answers.addColunm = ""
                warning("Add pelo menos uma coluna")
            }

        }

        // Create Dataset file
        var runCode = await replaceExisting(`datasets/${datasetName}.js`, "file", `${datasetName}.js`)
        if (runCode || !!parameters.options.r === true) {
            await template.generate({
                template: "datasets/dataset.js.ejs",
                target: `datasets/${datasetName}.js`,
                props: {
                    // variaveis passadas para dentro do template
                    dataset: baseDataset,
                    colunms: colunms,
                    colunmsDatasetBase: colunmsDatasetBase,
                }
            })
            success(`Arquivo criado: datasets/${datasetName}.js`)

        } else {
            warning(`Arquivo mantido: datasets/${datasetName}.js`)

        }
    }
}

module.exports = command
