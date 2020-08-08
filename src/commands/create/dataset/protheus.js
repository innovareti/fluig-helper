const command = {
    name: 'protheus',
    description: "Cria dataset pegando dados do protheus <EM DESENVOLVIMENTO>",
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
        const askTableName = { type: 'input', name: 'tableName', message: 'Qual o nome da tabela do protheus?' }
        const colunmName = { type: 'input', name: 'colunmName', message: 'Qual o nome da coluna do protheus?' }
        // multiple choice
        const askColunm = {
            type: 'select',
            name: 'addColunm',
            message: 'O que deseja fazer?',
            choices: ['Add coluna', 'Finalizar'],
        }
        var answers = {}
        answers.colunmName = ""
        
        var datasetName = await dsValidation(askName)
        var tableName
        while (tableName == null || tableName == undefined || tableName == "") {

            answers = await toolbox.prompt.ask(askTableName)
            regex = /^[A-Za-z0-9_]*[A-Za-z0-9_]*$/g
            if (regex.test(answers.tableName) && answers.tableName.length > 0){
                tableName = answers.tableName
            } else {
                msg = []
                regexMsg = / /g // procura espaços em branco
                if (regexMsg.test(answers.tableName)) {
                    msg.push("não utilize espaços")
                }
                regexMsg = /^[A-Za-z0-9_ ]*[A-Za-z0-9_ ]*$/
                if (!regexMsg.test(answers.tableName)){
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
        var colunmsProtheus = []
        answers.addColunm = ""
        while (answers.addColunm != "Finalizar") {
            answers = await toolbox.prompt.ask(askColunm)
            if (answers.addColunm == "Add coluna") {
                
                answers = await toolbox.prompt.ask(colunmName)
                regex = /^[A-Za-z0-9_]*[A-Za-z0-9_]*$/g
                if (regex.test(answers.colunmName) && answers.colunmName.length > 0){
                    colunmsProtheus.push(answers.colunmName)
                    success("Colunas criadas: " + colunmsProtheus.join(" || ")) 
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
            } else if (colunmsProtheus.length <= 0){
                answers.addColunm = ""
                warning("Add pelo menos uma coluna")

            }
        }

        // Create Dataset file
        var runCode = await replaceExisting(`datasets/${datasetName}.js`, "file", `${datasetName}.js`)
        if (runCode || !!parameters.options.r === true) {
            await template.generate({
                template: "datasets/dataset-protheus.js.ejs",
                target: `datasets/${datasetName}.js`,
                props: {
                    // variaveis passadas para dentro do template
                    tableName: tableName,
                    colunmsProtheus: colunmsProtheus
                }
            })
            success(`Arquivo criado: datasets/${datasetName}.js`)

        } else {
            warning(`Arquivo mantido: datasets/${datasetName}.js`)

        }
    }
}

module.exports = command
