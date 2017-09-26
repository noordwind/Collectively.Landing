FROM ruby:2.3.1

WORKDIR /app
COPY Gemfile* /app/
ADD . /app

RUN gem install bundler
RUN bundle
RUN middleman build

CMD middleman server -p 9000