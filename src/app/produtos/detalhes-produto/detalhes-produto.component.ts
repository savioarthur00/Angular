import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoService } from 'src/app/carrinho.service';
import { NotificaoService } from 'src/app/notificao.service';
import { IProduto, IprodutoCarrinho } from 'src/app/produtos';
import { ProdutosService } from 'src/app/produtos.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit{

  produto: IProduto | undefined ; 
  quantidade = 1;

  constructor(

    private produtosService: ProdutosService,
    private route: ActivatedRoute,
    private notificacaoService: NotificaoService,
    private carrinhoService: CarrinhoService

  ){}

  ngOnInit(): void {

    const routeParams = this.route.snapshot.paramMap;
    const produtoId = Number(routeParams.get("id"));
    this.produto = this.produtosService.getOne(produtoId)
    
    
    
  }

  adicionarAoCarrinho(){

      this.notificacaoService.notificar("O produto foi adicionado ao carrinho");
      const produto: IprodutoCarrinho = {
        ...this.produto!,
        quantidade: this.quantidade

      }
      this.carrinhoService.adicionarCarrinho(produto)


  }

}
