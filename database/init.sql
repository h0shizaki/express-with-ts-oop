DROP TABLE IF EXISTS video;

CREATE TABLE video (
  id SERIAL PRIMARY KEY,
  title VARCHAR (50) NOT NULL,
  duration INT NOT NULL,
  url_id VARCHAR (10) NOT NULL 
);

INSERT INTO public.video (title,duration,url_id) VALUES
	 ('Test',12,'123'),
	 ('Test1',11,'123'),
	 ('Test2',15,'123');

