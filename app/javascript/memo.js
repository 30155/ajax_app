function post (){
  //リクエストを送信する処理
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {  //eはイベントオブジェクトといい、イベント発生時の情報を持ったオブジェクト.(今回だと「投稿ボタンをクリックした」という情報を持ったオブジェクト)
    e.preventDefault(); //preventDefault()メソッド：既定のイベントを無効化するためのメソッド。（今回「投稿ボタンをクリックした」という現象を無効化するのは、クリックした直後にブラウザからリクエストが送信されることを防ぎたいから(リクエストの重複阻止)）
    const form = document.getElementById("form");
    const formData = new FormData(form); //FormData：フォームに入力された値を取得できるオブジェクト
    const XHR = new XMLHttpRequest();    //XMLHttpRequest：JavaScriptを用いてサーバーとHTTP通信を行うときに利用するオブジェクトです。
    XHR.open("POST", "/posts", true);    //open()メソッドとは、リクエストを初期化するメソッド。リクエストの内容を指定するためのメソッドだと理解しておいてください。
    XHR.responseType = "json";           //responseTypeプロパティ：レスポンスのデータフォーマットを指定するプロパティ
    XHR.send(formData);                  //send()メソッド：リクエストを送信するメソッド（フォームの内容をコントローラーへ送信）
  });
};

window.addEventListener('load', post);


/*
・「new FormData(フォームの要素);」のように記述することでオブジェクトを生成し、引数にフォームの要素を渡すことで、そのフォームに入力された値を取得できます。
・「new XMLHttpRequest」と記述することで、新しくオブジェクトを生成できます。
・openメソッド：第一引数にはHTTPメソッド、第二引数にはパス、第三引数には非同期通信であるかをtrueかfalseで記述。（今回は投稿したメモをデータベースに保存したいのでPOST）
・データフォーマット：リクエストやレスポンスをはじめとしたデータのやり取りを行う際に使われるデータの型のこと。（JSONなど）
・responseTypeプロパティとは、レスポンスのデータフォーマットを指定するプロパティです
*/