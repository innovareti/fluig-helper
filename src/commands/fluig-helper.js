const command = {
    name: 'fluig-helper',
    description: "Introdução",
    run: async toolbox => {
        const {
            parameters,
            print
        } = toolbox

        print.info('')
        print.success("// ========= BEM-VINDO AO FLUIG HELPER! ========= //")
        print.info('')
        print.warning('Para utilizar os comandos digite: fluig-helper <COMANDO>')
        print.warning('Mais informações sobre os comandos: fluig-helper --help')
    }
}

module.exports = command
