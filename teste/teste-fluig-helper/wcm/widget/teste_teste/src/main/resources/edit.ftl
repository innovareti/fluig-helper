<div id="TesteTeste_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="TesteTeste.instance()">
    <div class="widget-title">
        <h3></h3>
    </div>
    <div id="content">
        <div id="loader_${instanceId}" class="loader">
            <div class="icon">
                <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            </div>
        </div>

        <div class="row fs-xs-padding">
            <div class="col-md-3">
                <div class="form-group">
                    <label class="label-campo">Usuário</label>
                    <input type="text" class="form-control" id="usuario_${instanceId}">
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label class="label-campo">ID Protheus</label>
                    <input type="text" class="form-control" id="idProtheus_${instanceId}">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label class="label-campo">Aprovadores</label>
                    <div class="form-group">
                        <div class="input-group">
                            <select id="aprovadores_${instanceId}" name="aprovadores" class="form-control">
                                <option id="vazioAprovadores" name="vazioAprovadores" value="vazioAprovadores"></option>
                            </select>
                            <div class="input-group-addon">
                                <span class="fluigicon fluigicon-zoom-in"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div claas="row fs-xs-padding">
            <div class="col-md-12 fs-xl-margin-top">
                <button class="btn btn-primary btn-consulta" >Consultar</button>
            </div>
        </div>
        <div class="table-responsive fs-xl-margin-top">
            <table class="table" id="table_TesteTeste_${instanceId}">
                <thead>
                    <tr>
                        <th>SEQUÊNCIA</th>
                        <th>ID</th>
                        <th>NOME</th>
                        <th>USER</th>
                        <th>VALOR</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Conteúdo a que virá do dataset -->
                </tbody>
            </table>
        </div>
    </div>

    <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js"></script>

</div>
