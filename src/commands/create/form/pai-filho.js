const command = {
    name: 'pai-filho',
    description: "Cria um formulário com tabela pai e filho",
    run: async toolbox => {
        const {
            parameters,
            template,
            filesystem,
            replaceExisting,
            print: { success, error, warning }
        } = toolbox



        // text input
        const askName = { type: 'input', name: 'name', message: 'Qual o nome do formulário a ser criado?' }
        var answers = {}
        var formName
        answers.name = ""
        while (formName == null || formName == undefined || formName == "") {

            answers = await toolbox.prompt.ask(askName)
            regex = /^[A-Za-z0-9_]*[A-Za-z0-9_]*$/g
            if (regex.test(answers.name) && answers.name.length > 0){
                formName = answers.name
            } else {
                msg = []
                regexMsg = / /g // procura espaços em branco
                if (regexMsg.test(answers.name)) {
                    msg.push("não utilize espaços")
                }
                regexMsg = /^[A-Za-z0-9_ ]*[A-Za-z0-9_ ]*$/
                if (!regexMsg.test(answers.name)){
                    msg.push("não utilize caracteres especiais")
                }
                if (!answers.name.length > 0) {
                    warning("Esse campo não pode estar vazio")
                }
                msg = msg.join(", ")
                if(msg.length > 0) {
                    warning(`Dado inválido, por favor ${msg}`)
                }
            }

        }


        // Create index file
        var runCode = await replaceExisting(`forms/${formName}/index.html`, "file", "index.html")
        if (runCode || !!parameters.options.r === true) {
            await template.generate({
                template: "forms/pai-filho/index.html.ejs",
                target: `forms/${formName}/index.html`,
                props: {
                    // variaveis passadas para dentro do template
                }
            })
            success(`Arquivo criado: forms/${formName}/index.html`)

        } else {
            warning(`Arquivo mantido: forms/${formName}/index.html`)
        }

        // Create Main js file
        var runCode = await replaceExisting(`forms/${formName}/js/main.js`, "file", "main.js")
        if (runCode || !!parameters.options.r === true) {
            await template.generate({
                template: "forms/pai-filho/main.js.ejs",
                target: `forms/${formName}/js/main.js`,
                props: {
                    // variaveis passadas para dentro do templates
                }
            })
            success(`Arquivo criado: forms/${formName}/js/main.js`)

        } else {
            warning(`Arquivo mantido: forms/${formName}/js/main.js`)
        }

        // Create style CSS file
        var runCode = await replaceExisting(`forms/${formName}/css/style.css`, "file", "style.css")
        if (runCode || !!parameters.options.r === true) {
            await template.generate({
                template: "forms/pai-filho/style.css.ejs",
                target: `forms/${formName}/css/style.css`,
                props: {
                    // variaveis passadas para dentro do template
                }
            })
            success(`Arquivo criado: forms/${formName}/css/style.css`)

        } else {
            warning(`Arquivo mantido: forms/${formName}/css/style.css`)
        }

        // Create displayFields file
        var runCode = await replaceExisting(`forms/${formName}/events/displayFields.js`, "file", "displayFields.js")
        if (runCode || !!parameters.options.r === true) {
            await template.generate({
                template: "forms/pai-filho/events/displayFields.ejs",
                target: `forms/${formName}/events/displayFields.js`,
                props: {
                    // variaveis passadas para dentro do template
                }
            })
            success(`Arquivo criado: forms/${formName}/events/displayFields.js`)

        } else {
            warning(`Arquivo mantido: forms/${formName}/events/displayFields.js`)
        }

    }
}

module.exports = command