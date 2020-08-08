const command = {
    name: 'widget',
    description: "Cria widget com template básico <EM DESENVOLVIMENTO>",
    run: async toolbox => {
        const {
            parameters,
            template,
            filesystem,
            replaceExisting,
            print: { success, error, warning }
        } = toolbox


        // text input
        const askName = { type: 'input', name: 'name', message: 'Qual o nome da widget?' }
        const askCode = { type: 'input', name: 'code', message: 'Qual o código da widget? *Apenas letras, números e _ (underline)' }
        const askDescription = { type: 'input', name: 'description', message: 'Breve descrição da widget?' }

        
        var answers = await toolbox.prompt.ask(askName)
        var widgetName = answers.name
        var widgetCode
        // verifica se não tem caracteres proibidos
        var regex = /^[A-Za-z0-9_]*[A-Za-z0-9_]*$/g
        while (widgetCode == "" || widgetCode == null || widgetCode == undefined) {
            
            answers = await toolbox.prompt.ask(askCode)
            if(answers.code != "" || widgetCode != null || widgetCode != undefined) {
                if (regex.test(answers.code)) {
                    widgetCode = answers.code
                    
                } else {
                    warning("Caracter inválido, por favor digite novamente")
                }
            } else {
                warning("Esse campo não pode estar vazio!")
            }
        }

        var superWidgetName = widgetCode.split("_")
        // Captalize
        superWidgetName = superWidgetName.map(function (word) {
            captalizeWord = word.charAt(0).toUpperCase() + word.slice(1)
            return captalizeWord

        }).join("")
        

        answers = await toolbox.prompt.ask(askDescription)
        var widgetDescription = answers.description


        var pastas = [
            `wcm/widget/${widgetCode}`,
            `wcm/widget/${widgetCode}/src`,
            `wcm/widget/${widgetCode}/src/main`,
            `wcm/widget/${widgetCode}/src/main/java`,
            `wcm/widget/${widgetCode}/src/main/resources`,
            `wcm/widget/${widgetCode}/src/main/webapp`,
            `wcm/widget/${widgetCode}/src/main/webapp/META-INF`,
            `wcm/widget/${widgetCode}/src/main/webapp/resources`,
            `wcm/widget/${widgetCode}/src/main/webapp/resources/css`,
            `wcm/widget/${widgetCode}/src/main/webapp/resources/images`,
            `wcm/widget/${widgetCode}/src/main/webapp/resources/js`,
            `wcm/widget/${widgetCode}/src/main/webapp/WEB-INF`,
            `wcm/widget/${widgetCode}/src/test`,
            `wcm/widget/${widgetCode}/src/test/java`,
        ]
        for (pasta in pastas) {
            filesystem.dir(pastas[pasta])
            success(`Diretório criado: ${pastas[pasta]}`)
        }

        

        // Create file
        var path = `wcm/widget/${widgetCode}/src/main/resources/application.info`
        var runCode = await replaceExisting(path , "file", `application.info`)
        if (runCode || !!parameters.options.r === true) {
            await template.generate({
                template: "widgets/widget-consulta/resources/application.info.ejs",
                target: path,
                props: {
                    // variaveis passadas para dentro do template
                    widgetName: widgetName,
                    widgetCode: widgetCode,
                    widgetDescription: widgetDescription,
                    superWidgetName: superWidgetName,
                }
            })
            success(`Arquivo criado: ${path}`)
        
        } else {
            warning(`Arquivo mantido: ${path}`)

        }

        // Create file
        path = `wcm/widget/${widgetCode}/src/main/resources/edit.ftl`
        var runCode = await replaceExisting(path , "file", `edit.ftl`)
        if (runCode || !!parameters.options.r === true) {
            await template.generate({
                template: "widgets/widget-consulta/resources/edit.ftl.ejs",
                target: path,
                props: {
                    // variaveis passadas para dentro do template
                    widgetName: widgetName,
                    widgetCode: widgetCode,
                    widgetDescription: widgetDescription,
                    superWidgetName: superWidgetName,
                }
            })
            success(`Arquivo criado: ${path}`)
        
        } else {
            warning(`Arquivo mantido: ${path}`)

        }

        // Create file
        path = `wcm/widget/${widgetCode}/src/main/resources/${widgetCode}_en_US.properties`
        var runCode = await replaceExisting(path , "file", `${widgetCode}_en_US.properties`)
        if (runCode || !!parameters.options.r === true) {
            await template.generate({
                template: "widgets/widget-consulta/resources/translation_en_US.properties.ejs",
                target: path,
                props: {
                    // variaveis passadas para dentro do template
                    widgetName: widgetName,
                    widgetCode: widgetCode,
                    widgetDescription: widgetDescription,
                    superWidgetName: superWidgetName,
                }
            })
            success(`Arquivo criado: ${path}`)
        
        } else {
            warning(`Arquivo mantido: ${path}`)

        }

        // Create file
        path = `wcm/widget/${widgetCode}/src/main/resources/${widgetCode}_es.properties`
        var runCode = await replaceExisting(path , "file", `${widgetCode}_es.properties`)
        if (runCode || !!parameters.options.r === true) {
            await template.generate({
                template: "widgets/widget-consulta/resources/translation_es.properties.ejs",
                target: path,
                props: {
                    // variaveis passadas para dentro do template
                    widgetName: widgetName,
                    widgetCode: widgetCode,
                    widgetDescription: widgetDescription,
                    superWidgetName: superWidgetName,
                }
            })
            success(`Arquivo criado: ${path}`)
        
        } else {
            warning(`Arquivo mantido: ${path}`)

        }

        // Create file
        path = `wcm/widget/${widgetCode}/src/main/resources/${widgetCode}_pt_BR.properties`
        var runCode = await replaceExisting(path , "file", `${widgetCode}_pt_BR.properties`)
        if (runCode || !!parameters.options.r === true) {
            await template.generate({
                template: "widgets/widget-consulta/resources/translation_pt_BR.properties.ejs",
                target: path,
                props: {
                    // variaveis passadas para dentro do template
                    widgetName: widgetName,
                    widgetCode: widgetCode,
                    widgetDescription: widgetDescription,
                    superWidgetName: superWidgetName,
                }
            })
            success(`Arquivo criado: ${path}`)
        
        } else {
            warning(`Arquivo mantido: ${path}`)

        }

        // Create file
        path = `wcm/widget/${widgetCode}/src/main/resources/${widgetCode}.properties`
        var runCode = await replaceExisting(path , "file", `${widgetCode}.properties`)
        if (runCode || !!parameters.options.r === true) {
            await template.generate({
                template: "widgets/widget-consulta/resources/translation.properties.ejs",
                target: path,
                props: {
                    // variaveis passadas para dentro do template
                    widgetName: widgetName,
                    widgetCode: widgetCode,
                    widgetDescription: widgetDescription,
                    superWidgetName: superWidgetName,
                }
            })
            success(`Arquivo criado: ${path}`)
        
        } else {
            warning(`Arquivo mantido: ${path}`)

        }

        // Create file
        path = `wcm/widget/${widgetCode}/src/main/resources/view.ftl`
        var runCode = await replaceExisting(path , "file", `view.ftl`)
        if (runCode || !!parameters.options.r === true) {
            await template.generate({
                template: "widgets/widget-consulta/resources/view.ftl.ejs",
                target: path,
                props: {
                    // variaveis passadas para dentro do template
                    widgetName: widgetName,
                    widgetCode: widgetCode,
                    widgetDescription: widgetDescription,
                    superWidgetName: superWidgetName,
                }
            })
            success(`Arquivo criado: ${path}`)
        
        } else {
            warning(`Arquivo mantido: ${path}`)

        }

        // Create file
        path = `wcm/widget/${widgetCode}/src/main/webapp/resources/css/${widgetCode}.css`
        var runCode = await replaceExisting(path , "file", `${widgetCode}.css`)
        if (runCode || !!parameters.options.r === true) {
            await template.generate({
                template: "widgets/widget-consulta/webapp/resources/css/style.css.ejs",
                target: path,
                props: {
                    // variaveis passadas para dentro do template
                    widgetName: widgetName,
                    widgetCode: widgetCode,
                    widgetDescription: widgetDescription,
                    superWidgetName: superWidgetName,
                }
            })
            success(`Arquivo criado: ${path}`)
        
        } else {
            warning(`Arquivo mantido: ${path}`)

        }

        // Create file
        path = `wcm/widget/${widgetCode}/src/main/webapp/resources/js/${widgetCode}.js`
        var runCode = await replaceExisting(path , "file", `${widgetCode}.js`)
        if (runCode || !!parameters.options.r === true) {
            await template.generate({
                template: "widgets/widget-consulta/webapp/resources/js/main.js.ejs",
                target: path,
                props: {
                    // variaveis passadas para dentro do template
                    widgetName: widgetName,
                    widgetCode: widgetCode,
                    widgetDescription: widgetDescription,
                    superWidgetName: superWidgetName,
                }
            })
            success(`Arquivo criado: ${path}`)
        
        } else {
            warning(`Arquivo mantido: ${path}`)

        }

        // Create file
        path = `wcm/widget/${widgetCode}/src/main/webapp/WEB-INF/jboss-web.xml`
        var runCode = await replaceExisting(path , "file", `jboss-web.xml`)
        if (runCode || !!parameters.options.r === true) {
            await template.generate({
                template: "widgets/widget-consulta/webapp/WEB-INF/jboss-web.xml.ejs",
                target: path,
                props: {
                    // variaveis passadas para dentro do template
                    widgetName: widgetName,
                    widgetCode: widgetCode,
                    widgetDescription: widgetDescription,
                    superWidgetName: superWidgetName,
                }
            })
            success(`Arquivo criado: ${path}`)
        
        } else {
            warning(`Arquivo mantido: ${path}`)

        }

        // Create file
        path = `wcm/widget/${widgetCode}/src/main/webapp/WEB-INF/web.xml`
        var runCode = await replaceExisting(path , "file", `web.xml`)
        if (runCode || !!parameters.options.r === true) {
            await template.generate({
                template: "widgets/widget-consulta/webapp/WEB-INF/web.xml.ejs",
                target: path,
                props: {
                    // variaveis passadas para dentro do template
                    widgetName: widgetName,
                    widgetCode: widgetCode,
                    widgetDescription: widgetDescription,
                    superWidgetName: superWidgetName,
                }
            })
            success(`Arquivo criado: ${path}`)
        
        } else {
            warning(`Arquivo mantido: ${path}`)

        }
    }
}

module.exports = command
