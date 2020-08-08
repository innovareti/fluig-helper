module.exports = toolbox => {
    const {
        parameters,
        filesystem,
        print: { success, error, warning }
    } = toolbox


    async function replaceExisting(path, fileType, name) {

        const fileNameExists = filesystem.exists(path) == fileType ? true : false
        var runCode
        var fileTypeText = fileType == "file" ? "O arquivo" : "A pasta"
        if (fileNameExists && !!parameters.options.r === false) {

            // Select option replace
            const askReplace = {
                type: 'select',
                name: 'replace',
                message: `${fileTypeText} "${name}" já existe! Deseja substituir? ** Essa ação NÃO pode ser desfeita **`,
                choices: ['Substituir', 'Manter', "Substituir Próximos"],
            }
            const replaceFile = await toolbox.prompt.ask(askReplace)

            switch (replaceFile.replace) {

                case "Substituir Próximos":
                    parameters.options.r = true
                    break

                case "Manter":
                    runCode = false
                    break

                case "Substituir":
                    runCode = true
                    break

            }

        } else {
            runCode = true

        }
        return runCode

    }

    async function dsValidation(question, defaultDataset) {

        var dataset, answers
        var prop = question.name
        
        while (dataset == "" || dataset == null || dataset == undefined) {
            var regex = /^[a-z0-9_]*[a-z0-9_]*$/g
            answers = await toolbox.prompt.ask(question)
            if(answers[prop] != "" || dataset != null || dataset != undefined) {
                if (regex.test(answers[prop])) {
                    dataset = answers[prop]  
                } else {
                    msg = []
                    regex = /[A-Z]/g
                    if (regex.test(answers[prop])) {
                        msg.push("digite apenas letras minúsculas")
                    }
                    regex = / /g // procura espaços em branco
                    if (regex.test(answers[prop])) {
                        msg.push("não utilize espaços")
                    }
                    regex = /^[A-Za-z0-9_ ]*[A-Za-z0-9_ ]*$/
                    if (!regex.test(answers[prop])){
                        msg.push("não utilize caracteres especiais")
                    }
                    msg = msg.join(", ")
                    warning(`Dado inválido, por favor ${msg}`)
                }
            } else {
                if (defaultDataset == "" || defaultDataset == null || defaultDataset == undefined) {
                    warning("Esse campo não pode estar vazio!")
                    
                } else {
                    dataset = defaultDataset

                }
            }
        }
        return dataset

    }
    

    toolbox.dsValidation = dsValidation
    toolbox.replaceExisting = replaceExisting
}
