class PostsController < ApplicationController

  def index
    @posts = Post.order(id: "DESC")
  end

  # def new
  # end

  def create
    post = Post.create(content: params[:content]) #新たに投稿されたメモの内容を変数postに格納
    # redirect_to action: :index 以下に変更
    render json:{ post: post }  #「json:」の部分をjsonオプションといい、これを指定することによって、直後に記述した{ post: post }というデータをJSON形式で返却することができます。
    #上で定義した変数postの値を、postというキーとセットでJavaScriptに送信しています。
  end
end


# renderメソッドとは url：https://pikawaka.com/rails/render ここ詳しい