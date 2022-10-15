import { environment } from 'src/environments/environment.prod';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ConfigService } from '../config/config.service';

/**
 * Tratamento de Exceções, Depuração e Logging.
 * `LogService` oferece  um conjunto de metodos que possa produzir boa informação de log.
 * Níveis de prioridade:
 *  --SEVERE: falha séria. Frequentemente haverá uma exceção associada
 *  --CONFIG: mensagens geradas durante a configuração da aplicação
 *  --INFO: prioridade moderada: indica o que está sendo feito em vez de ser usado especificamente para depuração (ex. uma tarefa terminou)
 *  --FINE: informação de rastreamento: usado para debug
 *  --FINER: informação detalhada de rastreamento: usado para debug
 *  --FINEST: informação altamente detalhada de rastreamento: usado para debug
 */
@Injectable({
  providedIn: 'root'
})
export class LogService {



  /**
 * O método onerror
 * Manipulador de eventos onerror é um recurso para facilitar a manipulação de erros no JavaScript.
 *  O evento de erro é acionado no objeto janela sempre que ocorre uma exceção na página.
 *
 * Tratar erros é de suma importância e deixam as aplicações bem mais robustas e profissionais.
 * O addEventListener não detecta erros de compilação. Por isso uso esse método.
 * O onerror é melhor em erros de compilação pois passa mais argumentos.
 * https://www.youtube.com/watch?v=hAIuWUQeN2I
 * https://pt.stackoverflow.com/questions/144365/como-pegar-a-mensagem-detalhes-com-addeventlistenererror
 * https://angular.io/api/core/ErrorHandler
 */
  // window.onerror = (message, source, lineno, colno, error)  => {
  //     console.log(`
  //   Error:
  //   Mensagem ${JSON.stringify(message)},
  //   Endereço: ${JSON.stringify(source)},
  //   Número da Linha: ${JSON.stringify(lineno)},
  //   Número da coluna: ${JSON.stringify(colno)},
  //   Error Object (object): ${JSON.stringify(error)}
  //   `);
  //     // send to datalake
  //     // if(erro de carregamento preguisoso){
  //     window.location.reload();
  //     // }
  // return true;
  //   };

  constructor(private http: HttpClient) { }

  static readonly LISTA_DE_CODIGOS_E_STATUS = {
    _1_INFORMATIVA: 'Ocorreu um erro. Tente novamente mais tarde!',
    _2_INDISPONIBILIDADE_CONSULTA: 'Consulta temporariamente indisponivel, tente mais tarde!',
    _100_CONTINUAR: '',
    _101_MUDANDO_PROTOCOLOS: '',
    _102_PROCESSAMENTO: '',
    _122_PEDIDO_URI_MUITO_LONGO: '',
    _200_SUCESSO: '',
    _201_CRIADO: '',
    _202_ACEITO: '',
    _203_NÃO_AUTORIZADO: '',
    _204_NENHUM_CONTEÚDO: '',
    _205_RESET: '',
    _206_CONTEÚDO_PARCIAL: '',
    _207_STATUS_MULTI: '',
    _400_REDIRECIONAMENTO: '',
    _300_MÚLTIPLA_ESCOLHA: '',
    _301_MOVIDO: '',
    _302_ENCONTRADO: '',
    _303_CONSULTE_OUTROS: '',
    _304_NÃO_MODIFICADO: '',
    _305_USE_PROXY: '',
    _306_PROXY_SWITCH: '',
    _307_REDIRECIONAMENTO_TEMPORÁRIO: '',
    _308_REDIRECIONAMENTO_PERMANENTE: '',
    _4_ERRO_DE_CLIENTE: '',
    _400_REQUISIÇÃO_INVÁLIDA: '',
    _401_NÃO_AUTORIZADO: '',
    _402_PAGAMENTO_NECESSÁRIO: '',
    _403_PROIBIDO: '',
    _404_NÃO_ENCONTRADO: '',
    _405_MÉTODO_NÃO_PERMITIDO: '',
    _406_NÃO_ACEITÁVEL: '',
    _407_AUTENTICAÇÃO_DE_PROXY_NECESSÁRIA: '',
    _408_TEMPO_DE_REQUISIÇÃO_ESGOTOU: '',
    _409_CONFLITO_GERAL: '',
    _410_GONE: '',
    _411_COMPRIMENTO_NECESSÁRIO: '',
    _412_PRÉ_CONDIÇÃO_FALHOU: '',
    _413_ENTIDADE_DE_SOLICITAÇÃO_MUITO_GRANDE: '',
    _414_PEDIDO_URI_TOO_LONG: '',
    _415_TIPO_DE_MÍDIA_NÃO_SUPORTADO: '',
    _416_SOLICITADA_DE_FAIXA_NÃO_SATISFATÓRIA: '',
    _417_FALHA_NA_EXPECTATIVA: '',
    _418_EU_SOU_UM_BULE_DE_CHÁ: '',
    _422_ENTIDADE_IMPROCESSÁVEL: '',
    _423_FECHADO: '',
    _424_FALHA_DE_DEPENDÊNCIA: '',
    _425_COLEÇÃO_NÃO_ORDENADA: '',
    _426_UPGRADE_BRIGATÓRIO: '',
    _429_PEDIDOS_EM_EXCESSO: '',
    _450_BLOQUEADOS_PELO_CONTROLE_DE_PAIS_DO_WINDOWS: '',
    _499_CLIENTE_FECHOU_PEDIDO: '',
    _5_OUTROS_ERROS: '',
    _500_ERRO_INTERNO_DO_SERVIDOR: '',
    _501_NÃO_IMPLEMENTADO: '',
    _502_BAD_GATEWAY: '',
    _503_SERVIÇO_INDISPONÍVEL: '',
    _504_GATEWAY_TIME_OUT: '',
    _505_HTTP_VERSION_NOT_SUPPORTED: '',
  };

  /**
   * `SEVERE` para falha séria. Frequentemente haverá uma exceção associada
   */
  SEVERE(message: { component: string, method: string, value?: any, error?: any } | string) {
    // this.http.post(url,message);
    return (() => {
      if (!environment.production) {
        if (message) {
          // tslint:disable-next-line:no-console
          console.error();
          // tslint:disable-next-line:no-console
          console.table(message);
          // tslint:disable-next-line:no-console
          console.trace();
        }
      }
    })();
  }

  /**
  *  `CONFIG` para mensagens geradas durante a configuração da aplicação
   */
  CONFIG(message: { component: string, method: string, value?: any, error?: any } | string) {
    // this.http.post(url,message);
    return (() => {
      if (!environment.production) {
        if (message) {
          // tslint:disable-next-line:no-console
          console.table(message);
          // tslint:disable-next-line:no-console
          console.trace();
          // tslint:disable-next-line:no-console
          console.trace();
        }
        // tslint:disable-next-line:no-console
        console.trace();
      }
    })();
  }

  /**
  *  `INFO` para prioridade moderada.
  *  indica o que está sendo feito em vez de ser usado especificamente para depuração;
  * (ex. `uma tarefa terminou`)
   */
  INFO(message: { component: string, method: string, value?: any, error?: any } | string) {
    // this.http.post(url,message);
    return (() => {
      if (!environment.production) {
        if (message) {
          console.log(`%c INFO: ${message}!`, 'color: blue; font-style: italic');
        }
        // tslint:disable-next-line:no-console
        console.trace();
      }
    })();
  }

  /**
  *  `FINE` para informação de rastreamento: usado para debug
   */
  FINE(message: { component: string, method: string, value?: any, error?: any } | string) {
    // this.http.post(url,message);
    return (() => {
      if (!environment.production) {
        if (message) {
          // tslint:disable-next-line:no-console
          console.log(`%c FINE: ${message}!`, 'color: #04fc25; background-color: #000000');
        }
        // tslint:disable-next-line:no-console
        console.trace();
      }
    })();
  }

  /**
  *  `FINER` para informação detalhada de rastreamento: usado para debug
   */
  FINER(message: { component: string, method: string, value?: any, error?: any } | string) {
    // this.http.post(url,message);
    return (() => {
      if (!environment.production) {
        if (message) {
          // tslint:disable-next-line:no-console
          console.table(message);
          // tslint:disable-next-line:no-console
          console.trace();
        }
        // tslint:disable-next-line:no-console
        console.trace();
      }
    })();
  }

  /**
  *  `FINEST` para informação altamente detalhada de rastreamento: usado para debug
   */
  FINEST(message: { component: string, method: string, value?: any, error?: any } | string) {
    // this.http.post(url,message);

    return (() => {
      if (!environment.production) {
        if (message) {
          // tslint:disable-next-line:no-console
          console.table(message);
          // tslint:disable-next-line:no-console
          console.trace();
        }
        // tslint:disable-next-line:no-console
        console.trace();
      }
    })();
  }

}
