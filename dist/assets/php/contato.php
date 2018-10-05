<?php	
	if(strcasecmp('formulario-ajax', $_POST['metodo']) == 0){
	
		$html = 'Nome: ' .$_POST['nome'];
		$html .= "<br />";
		$html .= 'Telefone: '.$_POST['telefone'];
		$html .= "<br />";
		$html .= 'Email: '.$_POST['email'];
        $html .= "<br />";
		$html .= 'Mensagem: '.$_POST['mensagem'];
        $html .= "<br />";
		
		echo $html;
        
		$email = $_POST['email'];
            
        $email_remetente = "guilherme@jktextil.com.br"; // deve ser uma conta de email do seu dominio
	//====================================================
	
	//Configurações do email, ajustar conforme necessidade
	//==================================================== 
	$email_destinatario = "guilherme@jktextil.com.br"; // pode ser qualquer email que receberá as mensagens
	$email_reply = "$email";
	$email_assunto = "Contato site JK Têxtil."; // Este será o assunto da mensagem
	//====================================================
	
	//Monta o Corpo da Mensagem
	//====================================================
	$email_conteudo = "$html \n";
	//====================================================
	
	//Seta os Headers (Alterar somente caso necessario) 
	//==================================================== 
	$email_headers = implode ( "\n",array ( "From: $email_remetente", "Reply-To: $email_reply", "Return-Path: $email_remetente","MIME-Version: 1.0","X-Priority: 3","Content-Type: text/html; charset=UTF-8" ) );
        //==================================================== 
        if(!mail($email_destinatario, $email_assunto, $email_conteudo, $email_headers ,"-r".$email_remetente)){ // Se for Postfix
            mail($email_destinatario, $email_assunto, $email_conteudo, $email_headers );
        }
        else{
            echo("<script language='javascript'>alert('Falha ao enviar a mensagem')</script>"); }
    }
?>