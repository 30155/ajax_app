const buildHTML = (XHR) => {  
  const item = XHR.response.post;    //responseプロパティ：サーバーからのレスポンスに関する情報が格納されたプロパティ。（レスポンスの中から投稿されたメモの情報を抽出し、変数itemに格納してる）
  //XHR.response.postで値が取れるのは、postsコントローラーのcreateアクションにrender json: {post: post}と記述されていることで、postというキーと投稿されたメモの内容が紐付いているからです。
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};



function post (){
  //リクエストを送信する処理
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {  //eはイベントオブジェクトといい、イベント発生時の情報を持ったオブジェクト.(今回だと「投稿ボタンをクリックした」という情報を持ったオブジェクト)
    e.preventDefault(); //preventDefault()メソッド：既定のイベントを無効化するためのメソッド。（今回「投稿ボタンをクリックした」という現象を無効化するのは、クリックした直後にブラウザからリクエストが送信されること(デフォルトで備わってる機能)を防ぎたいから(リクエストの重複阻止)）
    const form = document.getElementById("form");
    const formData = new FormData(form); //FormData：フォームに入力された値を取得できるオブジェクト
    const XHR = new XMLHttpRequest();    //XMLHttpRequest：JavaScriptを用いてサーバーとHTTP通信を行うときに利用するオブジェクトです。
    XHR.open("POST", "/posts", true);    //open()メソッド：リクエストを初期化するメソッド。リクエストの内容を指定するためのメソッドだと理解しておいてください。
    XHR.responseType = "json";           //responseTypeプロパティ：レスポンスのデータフォーマットを指定するプロパティ
    XHR.send(formData);                  //send()メソッド：リクエストを送信するメソッド（フォームの内容をコントローラーへ送信）
    XHR.onload = () => {                 //onloadプロパティ：リクエストの送信が成功したときに呼び出されるプロパティ。リクエストの送信に成功したときに行う処理を定義します。
      if (XHR.status != 200) {    //200はHTTPステータスコードの一つ（200：リクエスト成功の意）/ XHR.statusには、HTTPステータスコードが格納されていて、それが成功(200)かチェックしてる。
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;              //JavaScriptの処理から抜け出すことができる。エラーの場合これ以降の処理は不要のため。
      }
      const list = document.getElementById("list");   //新しいメモを挿入するための要素を取得して、変数listに格納
      const formText = document.getElementById("content");  //リセットの対象となるフォームの要素contentを取得して、変数formTextに格納しています。
      
      list.insertAdjacentHTML("afterend", buildHTML(XMR));  //buildHTML(XMR) = html。上の関数の戻り値のhtmlのこと。(投稿後に新たに生成されたHTMLのこと)
      //おそらくここでフォームから送られてきたデータを画面に反映する作業をしている。データを元に「buildHTML関数」で新たに挿入するHTMLファイルを作って、JavaScriptがそれをどこに入れるか「insertAdjacentHTML」で指定してる。
      
      formText.value = "";  //投稿後にフォームの入力欄を空にするため。
    };
  });
};

window.addEventListener('load', post);


/*
・「new FormData(フォームの要素);」のように記述することでオブジェクトを生成し、引数にフォームの要素を渡すことで、そのフォームに入力された値を取得できます。
・「new XMLHttpRequest」と記述することで、新しくオブジェクトを生成できます。
・openメソッド：第一引数にはHTTPメソッド、第二引数にはパス、第三引数には非同期通信であるかをtrueかfalseで記述。（今回は投稿したメモをデータベースに保存したいのでPOST）
・データフォーマット：リクエストやレスポンスをはじめとしたデータのやり取りを行う際に使われるデータの型のこと。（JSONなど）
・responseTypeプロパティとは、レスポンスのデータフォーマットを指定するプロパティです。
・insertAdjacentHTMLメソッド：HTMLをある要素の指定した箇所に挿入するメソッド。「<挿入したい要素名>.insertAdjacentHTML(挿入したい位置,挿入したいHTML);」
*/

/* 登場したXMLHttpRequestオブジェクトのプロパティとメソッドまとめ（見た感じ使うときは先頭に「XHR.」を付けるっぽい）
・open()メソッド
・send()メソッド
・onloadプロパティ
・responseプロパティ
*/