DROP TABLE IF EXISTS video;

CREATE TABLE video (
  id SERIAL PRIMARY KEY,
  title VARCHAR (50) NOT NULL,
  url_id VARCHAR (10) NOT NULL ,
  duration INT NOT NULL
);

INSERT INTO public.video (title,url_id,duration) VALUES
	 ('Test','123',12),
	 ('Test1','123',11),
	 ('Test2','123',15);

