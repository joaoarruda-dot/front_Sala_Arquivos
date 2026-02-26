let corredorAtual = '1';
let corredorModalAtual = '1';
let abaAtual = 'profile';
let arquivoAvatar = null;
let paginaAtual = 'dashboard';

// ==================== FUNÇÕES DE NAVEGAÇÃO ====================
function carregarConteudo(pagina) {
    const conteudoPrincipal = document.querySelector('.main-content');
    if (!conteudoPrincipal) return;

    const itensMenu = document.querySelectorAll('.menu-item');
    itensMenu.forEach(item => {
        item.classList.remove('active');
    });

    const itemAtivo = Array.from(itensMenu).find(item => 
        item.querySelector('span')?.textContent.toLowerCase().includes(pagina)
    );
    if (itemAtivo) {
        itemAtivo.classList.add('active');
    }

    switch(pagina) {
        case 'dashboard':
            carregarDashboard();
            break;
        case 'processos':
            carregarProcessos();
            break;
        case 'prestadores':
            carregarPrestadores();
            break;
        case 'partições':
            carregarParticoes();
            break;
        case 'históricos':
            carregarHistoricos();
            break;
        case 'configurações':
            carregarConfiguracoes();
            break;
    }
}
// ==================== CONTEÚDO DO DASHBOARD ====================
function carregarDashboard() {
    const conteudoPrincipal = document.querySelector('.main-content');
    conteudoPrincipal.innerHTML = `
        <!-- Barra Superior -->
        <div class="top-bar">
            <div class="search-box">
                <input type="text" placeholder="Buscar processo por QR Code, código ou prestador...">
                <button>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </div>
            <div class="user-info">
                <span>Bem-vindo, João Silva</span>
                <div class="user-avatar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
            </div>
        </div>

        <!-- Cards de Estatísticas -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-value">1,234</span>
                    <i>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect>
                            <line x1="8" y1="9" x2="16" y2="9"></line>
                            <line x1="8" y1="13" x2="16" y2="13"></line>
                            <line x1="8" y1="17" x2="12" y2="17"></line>
                        </svg>
                    </i>
                </div>
                <div class="stat-label">Total de Processos</div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-value">156</span>
                    <i>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                    </i>
                </div>
                <div class="stat-label">Partições Ocupadas</div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-value">45</span>
                    <i>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 12v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5"></path>
                            <line x1="7" y1="8" x2="12" y2="13"></line>
                            <line x1="17" y1="8" x2="12" y2="13"></line>
                            <line x1="12" y1="3" x2="12" y2="13"></line>
                        </svg>
                    </i>
                </div>
                <div class="stat-label">Processos Retirados</div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-value">12</span>
                    <i>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </i>
                </div>
                <div class="stat-label">Prestadores Ativos</div>
            </div>
        </div>

        <!-- Grid Principal -->
        <div class="main-grid">
            <!-- Card de Registro Rápido -->
            <div class="quick-register">
                <h3>
                    <i>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M13 2L3 14h8l-2 8 10-12h-8l2-8z"></path>
                        </svg>
                    </i>
                    Registro Rápido de Movimentação
                </h3>
                <form id="movementForm">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Código QR Code</label>
                            <input type="text" placeholder="Leia ou digite o código" id="qrCode">
                        </div>
                        <div class="form-group">
                            <label>Tipo</label>
                            <select id="movementType">
                                <option value="entrada">Entrada</option>
                                <option value="saida">Saída</option>
                                <option value="devolucao">Devolução</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Localização (Partição)</label>
                        <input type="text" placeholder="Ex: C1-45" id="locationInput" readonly>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Quem colocou</label>
                            <input type="text" placeholder="Insira quem colocou" id="placedBy">
                        </div>
                        <div class="form-group">
                            <label>Quem retirou (se for saída)</label>
                            <input type="text" placeholder="Insira quem retirou" id="removedBy">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Data/Hora Entrada</label>
                            <input type="datetime-local" id="entryDate" value="2024-01-15T14:30">
                        </div>
                        <div class="form-group">
                            <label>Data/Hora Saída</label>
                            <input type="datetime-local" id="exitDate">
                        </div>
                    </div>

                    <button type="submit" class="btn-primary">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                            <polyline points="17 21 17 13 7 13 7 21"></polyline>
                            <polyline points="7 3 7 8 15 8"></polyline>
                        </svg>
                        Registrar Movimentação
                    </button>
                </form>
            </div>

            <!-- Mapa da Sala com Corredores -->
            <div class="room-map">
                <h3>
                    <i>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="3 6 12 2 21 6 21 18 12 22 3 18 3 6"></polygon>
                            <line x1="12" y1="22" x2="12" y2="12"></line>
                            <polyline points="9 10 12 12 15 10"></polyline>
                        </svg>
                    </i>
                    Mapa da Sala
                </h3>
                
                <div class="corredor-selector">
                    <button class="corredor-btn active" onclick="mudarCorredor('1', event)">Corredor 1 (1-40)</button>
                    <button class="corredor-btn" onclick="mudarCorredor('2', event)">Corredor 2 (41-120)</button>
                    <button class="corredor-btn" onclick="mudarCorredor('3', event)">Corredor 3 (121-160)</button>
                </div>
                
                <div class="corredor-indicator" id="corredorIndicator">Exibindo Corredor 1 - Partições 1 a 40</div>
                
                <div class="partitions-grid" id="partitionsGrid">
                    <!-- Partições serão geradas via JavaScript -->
                </div>
                
                <div class="map-legend">
                    <span>
                        <span class="legend-color available"></span> Vazio
                    </span>
                    <span>
                        <span class="legend-color occupied"></span> Ocupado
                    </span>
                </div>
            </div>
        </div>

        <!-- Histórico de Movimentações -->
        <div class="historico-movimentacao">
            <h3>
                <i>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                </i>
                Últimas Movimentações
            </h3>
            <table class="moves-table">
                <thead>
                    <tr>
                        <th>Data/Hora</th>
                        <th>Processo</th>
                        <th>Tipo</th>
                        <th>Local</th>
                        <th>Responsável</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody id="tabelaHistoricoMov">
                    <tr>
                        <td>15/01/2024 14:30</td>
                        <td>PROC-2024-001</td>
                        <td><span class="badge entrada">Entrada</span></td>
                        <td>C1-27</td>
                        <td>João Silva</td>
                        <td>Na prateleira</td>
                    </tr>
                    <tr>
                        <td>15/01/2024 11:20</td>
                        <td>PROC-2024-045</td>
                        <td><span class="badge saida">Saída</span></td>
                        <td>C2-89</td>
                        <td>Maria Santos</td>
                        <td>Retirado</td>
                    </tr>
                    <tr>
                        <td>14/01/2024 16:45</td>
                        <td>PROC-2024-032</td>
                        <td><span class="badge devolucao">Devolução</span></td>
                        <td>C3-156</td>
                        <td>Pedro Oliveira</td>
                        <td>Na prateleira</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    gerarParticoes('1');

    document.getElementById('locationInput')?.addEventListener('click', abrirModal);
    document.getElementById('movementForm')?.addEventListener('submit', registrarMovimentacao);

    const tipoMovimento = document.getElementById('movementType');
    const quemRetirou = document.getElementById('removedBy');
    if (tipoMovimento && quemRetirou) {
        tipoMovimento.addEventListener('change', function() {
            quemRetirou.disabled = this.value !== 'saida';
            if (this.value !== 'saida') quemRetirou.value = '';
        });
        quemRetirou.disabled = true;
    }
}
// ==================== CONTEÚDO DE PROCESSOS ====================
function carregarProcessos() {
    const conteudoPrincipal = document.querySelector('.main-content');
    conteudoPrincipal.innerHTML = `
        <div class="page-header">
            <h2>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                Gerenciar Processos
            </h2>
        </div>

        <div class="filtros-box">
            <div class="form-row">
                <div class="form-group">
                    <label>Buscar</label>
                    <input type="text" placeholder="Buscar por código, prestador ou descrição">
                </div>
                <div class="form-group">
                    <label>Status</label>
                    <select>
                        <option>Todos</option>
                        <option>Na sala</option>
                        <option>Retirado</option>
                        <option>Extraviado</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Prestador</label>
                    <select>
                        <option>Todos</option>
                        <option>Prestador A</option>
                        <option>Prestador B</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="tabela-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Prestador</th>
                        <th>Descrição</th>
                        <th>Data Cadastro</th>
                        <th>Status</th>
                        <th>Localização</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>PROC-2024-001</td>
                        <td>Prestador A</td>
                        <td>Processo trabalhista</td>
                        <td>15/01/2024</td>
                        <td><span class="badge entrada">Na sala</span></td>
                        <td>C1-27</td>
                        <td>
                            <button class="btn-icon" onclick="verProcesso('PROC-2024-001')">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="3"></circle>
                                    <path d="M22 12c-2.667 4.667-6 7-10 7s-7.333-2.333-10-7c2.667-4.667 6-7 10-7s7.333 2.333 10 7z"></path>
                                </svg>
                            </button>
                            <button class="btn-icon" onclick="editarProcesso('PROC-2024-001')">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                                    <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}
// ==================== CONTEÚDO DE PRESTADORES ====================
function carregarPrestadores() {
    const conteudoPrincipal = document.querySelector('.main-content');
    conteudoPrincipal.innerHTML = `
        <div class="page-header">
            <h2>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Gerenciar Prestadores
            </h2>
        </div>

        <div class="filtros-box">
            <div class="form-row">
                <div class="form-group">
                    <label>Buscar</label>
                    <input type="text" placeholder="Buscar por nome, CNPJ ou email">
                </div>
                <div class="form-group">
                    <label>Status</label>
                    <select>
                        <option>Todos</option>
                        <option>Ativo</option>
                        <option>Inativo</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="tabela-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CNPJ</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Processos</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Prestador A</td>
                        <td>12.345.678/0001-90</td>
                        <td>(11) 99999-9999</td>
                        <td>contato@prestadora.com</td>
                        <td><span class="badge entrada">Ativo</span></td>
                        <td>45</td>
                        <td>
                            <button class="btn-icon" onclick="verPrestador('1')">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="3"></circle>
                                    <path d="M22 12c-2.667 4.667-6 7-10 7s-7.333-2.333-10-7c2.667-4.667 6-7 10-7s7.333 2.333 10 7z"></path>
                                </svg>
                            </button>
                            <button class="btn-icon" onclick="editarPrestador('1')">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                                    <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}
// ==================== CONTEÚDO DE PARTIÇÕES ====================
function carregarParticoes() {
    const conteudoPrincipal = document.querySelector('.main-content');
    conteudoPrincipal.innerHTML = `
        <div class="page-header">
            <h2>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                Gerenciar Partições
            </h2>
        </div>

        <div class="estatisticas-particoes">
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-value">160</span>
                </div>
                <div class="stat-label">Total de Partições</div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-value">156</span>
                </div>
                <div class="stat-label">Ocupadas</div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-value">4</span>
                </div>
                <div class="stat-label">Disponíveis</div>
            </div>
        </div>

        <div class="corredor-selector">
            <button class="corredor-btn active" onclick="mudarCorredorParticoes('1', event)">Corredor 1 (1-40)</button>
            <button class="corredor-btn" onclick="mudarCorredorParticoes('2', event)">Corredor 2 (41-120)</button>
            <button class="corredor-btn" onclick="mudarCorredorParticoes('3', event)">Corredor 3 (121-160)</button>
        </div>

        <div class="particoes-lista" id="particoesLista">
            <!-- Será preenchido via JavaScript -->
        </div>
    `;

    gerarListaParticoes('1');
}
// ==================== CONTEÚDO DE HISTÓRICOS ====================
function carregarHistoricos() {
    const conteudoPrincipal = document.querySelector('.main-content');
    conteudoPrincipal.innerHTML = `
        <div class="page-header">
            <h2>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Histórico de Movimentações
            </h2>
        </div>

        <div class="filtros-box">
            <div class="form-row">
                <div class="form-group">
                    <label>Data/Hora Entrada</label>
                    <input type="date" id="dataInicio"> <label>Data/Hora Saída</label> <input type="date" id="dataFim">
                </div>
                <div class="form-group">
                    <label>Processo</label>
                    <input type="text" placeholder="Código do processo">
                </div>
                <div class="form-group">
                    <label>Prestador</label>
                    <select>
                        <option>Todos</option>
                        <option>Prestador A</option>
                        <option>Prestador B</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Tipo</label>
                    <select>
                        <option>Todos</option>
                        <option>Entrada</option>
                        <option>Saída</option>
                        <option>Devolução</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="tabela-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Data/Hora</th>
                        <th>Processo</th>
                        <th>Prestador</th>
                        <th>Tipo</th>
                        <th>Local</th>
                        <th>Colocou</th>
                        <th>Retirou</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>15/01/2024 14:30</td>
                        <td>PROC-2024-001</td>
                        <td>Prestador A</td>
                        <td><span class="badge entrada">Entrada</span></td>
                        <td>C1-27</td>
                        <td>João Silva</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}
// ==================== CONTEÚDO DE CONFIGURAÇÕES ====================
function carregarConfiguracoes() {
    const conteudoPrincipal = document.querySelector('.main-content');
    conteudoPrincipal.innerHTML = `
        <div class="page-header">
            <h2>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="4" y1="21" x2="4" y2="14"></line>
                    <line x1="4" y1="10" x2="4" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12" y2="3"></line>
                    <line x1="20" y1="21" x2="20" y2="16"></line>
                    <line x1="20" y1="12" x2="20" y2="3"></line>
                    <line x1="1" y1="14" x2="7" y2="14"></line>
                    <line x1="9" y1="8" x2="15" y2="8"></line>
                    <line x1="17" y1="16" x2="23" y2="16"></line>
                </svg>
                Configurações do Sistema
            </h2>
        </div>

        <div class="configuracoes-grid">
            <div class="config-card" onclick="abrirModalConfiguracoes('perfil')">
                <i>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </i>
                <h3>Meu Perfil</h3>
                <p>Editar informações pessoais e foto</p>
            </div>
        </div>
    `;
}
// ==================== FUNÇÕES DAS PARTIÇÕES COM CORREDORES ====================
function gerarParticoes(corredor) {
    const grid = document.getElementById('partitionsGrid');
    const indicador = document.getElementById('corredorIndicator');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    let inicio, fim;
    if (corredor === '1') {
        inicio = 1;
        fim = 40;
        if (indicador) indicador.textContent = 'Exibindo Corredor 1 - Partições 1 a 40';
    } else if (corredor === '2') {
        inicio = 41;
        fim = 120;
        if (indicador) indicador.textContent = 'Exibindo Corredor 2 - Partições 41 a 120';
    } else {
        inicio = 121;
        fim = 160;
        if (indicador) indicador.textContent = 'Exibindo Corredor 3 - Partições 121 a 160';
    }
    
    for (let i = inicio; i <= fim; i++) {
        const particao = document.createElement('div');
        particao.className = `partition ${Math.random() > 0.7 ? 'occupied' : 'available'}`;
        particao.textContent = i;
        particao.onclick = () => selecionarParticao(corredor, i);
        grid.appendChild(particao);
    }
}
function gerarParticoesModal(corredor) {
    const grid = document.getElementById('modalPartitionsGrid');
    const indicador = document.getElementById('modalCorredorIndicator');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    let inicio, fim;
    if (corredor === '1') {
        inicio = 1;
        fim = 40;
        if (indicador) indicador.textContent = 'Exibindo Corredor 1 - Partições 1 a 40';
    } else if (corredor === '2') {
        inicio = 41;
        fim = 120;
        if (indicador) indicador.textContent = 'Exibindo Corredor 2 - Partições 41 a 120';
    } else {
        inicio = 121;
        fim = 160;
        if (indicador) indicador.textContent = 'Exibindo Corredor 3 - Partições 121 a 160';
    }
    
    for (let i = inicio; i <= fim; i++) {
        const particao = document.createElement('div');
        particao.className = `partition ${Math.random() > 0.7 ? 'occupied' : 'available'}`;
        particao.textContent = i;
        particao.onclick = () => selecionarParticao(corredor, i);
        grid.appendChild(particao);
    }
}
function mudarCorredor(corredor, evento) {
    evento.preventDefault();

    const botoes = document.querySelectorAll('.room-map .corredor-btn');
    botoes.forEach(btn => btn.classList.remove('active'));
    evento.target.classList.add('active');

    corredorAtual = corredor;
    gerarParticoes(corredor);
}
function mudarCorredorModal(corredor, evento) {
    evento.preventDefault();

    const botoes = document.querySelectorAll('.modal .corredor-btn');
    botoes.forEach(btn => btn.classList.remove('active'));
    evento.target.classList.add('active');

    corredorModalAtual = corredor;
    gerarParticoesModal(corredor);
}
function mudarCorredorParticoes(corredor, evento) {
    evento.preventDefault();

    // Remover active de todos os botões corredor-btn na página
    document.querySelectorAll('.corredor-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Adicionar active no botão clicado
    evento.target.classList.add('active');

    gerarListaParticoes(corredor);
}
function gerarListaParticoes(corredor) {
    const lista = document.getElementById('particoesLista');
    if (!lista) return;
    
    lista.innerHTML = '';
    lista.className = 'particoes-lista-grid';
    
    let inicio, fim;
    if (corredor === '1') {
        inicio = 1;
        fim = 40;
    } else if (corredor === '2') {
        inicio = 41;
        fim = 120;
    } else {
        inicio = 121;
        fim = 160;
    }
    
    for (let i = inicio; i <= fim; i++) {
        const card = document.createElement('div');
        card.className = 'particao-card';
        const ocupado = Math.random() > 0.7;
        card.innerHTML = `
            <div class="particao-numero">${i}</div>
            <div class="particao-status ${ocupado ? 'ocupado' : 'vazio'}">
                ${ocupado ? '📄 Ocupado' : '✅ Vazio'}
            </div>
            ${ocupado ? '<div class="particao-processo">PROC-2024-00' + Math.floor(Math.random() * 100) + '</div>' : ''}
            <div class="particao-acoes">
                <button class="btn-icon" onclick="verParticao('${corredor}', ${i})">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M22 12c-2.667 4.667-6 7-10 7s-7.333-2.333-10-7c2.667-4.667 6-7 10-7s7.333 2.333 10 7z"></path>
                    </svg>
                </button>
                <button class="btn-icon" onclick="historicoParticao('${corredor}', ${i})">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                </button>
            </div>
        `;
        lista.appendChild(card);
    }
}
// ==================== FUNÇÕES DE MODAL ====================
function selecionarParticao(corredor, numero) {
    document.getElementById('locationInput').value = `C${corredor}-${numero}`;
    fecharModal();
}
function abrirModal() {
    document.getElementById('partitionModal').classList.add('active');
    gerarParticoesModal(corredorModalAtual);
}
function fecharModal() {
    document.getElementById('partitionModal').classList.remove('active');
}
function abrirModalConfiguracoes(tipo) {
    document.getElementById('settingsModal').classList.add('active');
    mudarAba(tipo === 'perfil' ? 'profile' : 'security');
}
function fecharModalConfiguracoes() {
    document.getElementById('settingsModal').classList.remove('active');
}
function mudarAba(aba) {
    abaAtual = aba;
    
    const botoesAba = document.querySelectorAll('.tab-btn');
    botoesAba.forEach(btn => btn.classList.remove('active'));
    
    const conteudos = document.querySelectorAll('.tab-content');
    conteudos.forEach(conteudo => conteudo.classList.remove('active'));
    
    if (aba === 'profile') {
        document.querySelectorAll('.tab-btn')[0].classList.add('active');
        document.getElementById('profileTab').classList.add('active');
    } else {
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
        document.getElementById('securityTab').classList.add('active');
    }
}
// ==================== FUNÇÕES DE NOTIFICAÇÃO ====================
function mostrarNotificacao(mensagem, tipo = 'success') {
    const notificacao = document.createElement('div');
    notificacao.className = `notification ${tipo}`;
    
    let icone = '';
    if (tipo === 'success') {
        icone = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    } else if (tipo === 'error') {
        icone = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    } else {
        icone = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="12" x2="12" y2="16"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    }
    
    notificacao.innerHTML = `
        <i>${icone}</i>
        <span>${mensagem}</span>
    `;
    
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.classList.add('fade-out');
        setTimeout(() => {
            notificacao.remove();
        }, 300);
    }, 3000);
}
// ==================== FUNÇÕES DE AVATAR ====================
function uploadAvatar(evento) {
    const arquivo = evento.target.files[0];
    if (!arquivo) return;
    if (!arquivo.type.startsWith('image/')) {
        mostrarNotificacao('Por favor, selecione uma imagem válida', 'error');
        return;
    }
    if (arquivo.size > 2 * 1024 * 1024) {
        mostrarNotificacao('A imagem deve ter no máximo 2MB', 'error');
        return;
    }

    arquivoAvatar = arquivo;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const avatar = document.querySelector('.profile-avatar');
        if (avatar) {
            avatar.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
        }
    };
    reader.readAsDataURL(arquivo);
    
    mostrarNotificacao('Foto atualizada com sucesso!', 'success');
}
function verificarForcaSenha(senha) {
    const barras = document.querySelectorAll('.strength-bar');
    let forca = 0;
    
    if (senha.length >= 8) forca++;
    if (senha.match(/[a-z]/) && senha.match(/[A-Z]/)) forca++;
    if (senha.match(/[0-9]/)) forca++;
    if (senha.match(/[^a-zA-Z0-9]/)) forca++;
    
    barras.forEach((barra, index) => {
        barra.classList.remove('fraca', 'media', 'forte');
        if (index < forca) {
            if (forca <= 2) barra.classList.add('fraca');
            else if (forca <= 3) barra.classList.add('media');
            else barra.classList.add('forte');
        }
    });
}
// ==================== FUNÇÕES DE LOGOUT E MOVIMENTAÇÃO ====================
function logout() {
    if (confirm('Tem certeza que deseja sair?')) {
        window.location.href = 'index.html';
    }
}
function registrarMovimentacao(evento) {
    evento.preventDefault();

    const dadosFormulario = {
        qrCode: document.getElementById('qrCode').value,
        tipoMovimento: document.getElementById('movementType').value,
        localizacao: document.getElementById('locationInput').value,
        quemColocou: document.getElementById('placedBy').value,
        quemRetirou: document.getElementById('removedBy').value,
        dataEntrada: document.getElementById('entryDate').value,
        dataSaida: document.getElementById('exitDate').value
    };
    
    if (!dadosFormulario.qrCode) {
        alert('Por favor, insira o código QR');
        return;
    }
    if (!dadosFormulario.localizacao) {
        alert('Por favor, selecione uma localização');
        return;
    }
    
    console.log('Registrando movimentação:', dadosFormulario);
    mostrarNotificacao('Movimentação registrada com sucesso!');
    evento.target.reset();
}
function salvarConfiguracoes() {
    mostrarNotificacao('Configurações salvas com sucesso!');
    fecharModalConfiguracoes();
}
// ==================== FUNÇÕES PARA MODAIS ESPECÍFICOS ====================
function verProcesso(id) {
    mostrarNotificacao('Visualizando processo ' + id, 'info');
}
function editarProcesso(id) {
    mostrarNotificacao('Editando processo ' + id, 'info');
}
function verPrestador(id) {
    mostrarNotificacao('Visualizando prestador ' + id, 'info');
}
function editarPrestador(id) {
    mostrarNotificacao('Editando prestador ' + id, 'info');
}
function verParticao(corredor, numero) {
    mostrarNotificacao(`Visualizando partição C${corredor}-${numero}`, 'info');
}
function historicoParticao(corredor, numero) {
    mostrarNotificacao(`Histórico da partição C${corredor}-${numero}`, 'info');
}
document.addEventListener('DOMContentLoaded', function() {
    const itensMenu = document.querySelectorAll('.menu-item');
    itensMenu.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const texto = this.querySelector('span')?.textContent.toLowerCase();
            if (texto) {
                if (texto === 'sair') {
                    logout();
                } else {
                    carregarConteudo(texto);
                }
            }
        });
    });

    gerarParticoes('1');
    gerarParticoesModal('1');

    const inputLocalizacao = document.getElementById('locationInput');
    if (inputLocalizacao) {
        inputLocalizacao.addEventListener('click', abrirModal);
    }
    const inputAvatar = document.getElementById('avatarInput');
    if (inputAvatar) {
        inputAvatar.addEventListener('change', uploadAvatar);
    }
    const novaSenha = document.getElementById('newPassword');
    if (novaSenha) {
        novaSenha.addEventListener('input', function() {
            verificarForcaSenha(this.value);
        });
    }
    const formPerfil = document.getElementById('profileForm');
    if (formPerfil) {
        formPerfil.addEventListener('submit', function(e) {
            e.preventDefault();
            mostrarNotificacao('Perfil atualizado com sucesso!');
        });
    }
    const formSenha = document.getElementById('passwordForm');
    if (formSenha) {
        formSenha.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const senhaAtual = document.getElementById('currentPassword').value;
            const novaSenha = document.getElementById('newPassword').value;
            const confirmarSenha = document.getElementById('confirmPassword').value;
            
            if (!senhaAtual) {
                mostrarNotificacao('Por favor, informe a senha atual', 'error');
                return;
            }
            
            if (novaSenha.length < 8) {
                mostrarNotificacao('A nova senha deve ter no mínimo 8 caracteres', 'error');
                return;
            }
            
            if (novaSenha !== confirmarSenha) {
                mostrarNotificacao('As senhas não coincidem', 'error');
                return;
            }
            
            mostrarNotificacao('Senha alterada com sucesso!');
            formSenha.reset();
        });
    }
});
window.onclick = function(evento) {
    const modalParticao = document.getElementById('partitionModal');
    const modalConfig = document.getElementById('settingsModal');
    
    if (evento.target == modalParticao) {
        fecharModal();
    }
    
    if (evento.target == modalConfig) {
        fecharModalConfiguracoes();
    }
};