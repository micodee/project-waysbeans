PGDMP         1                {         	   waysbeans    15.1    15.1 3    0           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            1           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            2           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            3           1262    16451 	   waysbeans    DATABASE     �   CREATE DATABASE waysbeans WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Indonesian_Indonesia.1252';
    DROP DATABASE waysbeans;
                postgres    false            �            1259    16520    cart_to_transactions    TABLE     �   CREATE TABLE public.cart_to_transactions (
    product_id bigint,
    product_name text,
    product_photo text,
    product_price bigint,
    order_quantity bigint,
    transaction_id bigint,
    id bigint NOT NULL
);
 (   DROP TABLE public.cart_to_transactions;
       public         heap    postgres    false            �            1259    19044    cart_to_transactions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_to_transactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.cart_to_transactions_id_seq;
       public          postgres    false    224            4           0    0    cart_to_transactions_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.cart_to_transactions_id_seq OWNED BY public.cart_to_transactions.id;
          public          postgres    false    225            �            1259    16490    carts    TABLE     �   CREATE TABLE public.carts (
    id bigint NOT NULL,
    user_id bigint,
    product_id bigint,
    order_qty integer,
    subtotal integer,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);
    DROP TABLE public.carts;
       public         heap    postgres    false            �            1259    16489    carts_id_seq    SEQUENCE     u   CREATE SEQUENCE public.carts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.carts_id_seq;
       public          postgres    false    221            5           0    0    carts_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;
          public          postgres    false    220            �            1259    16462    products    TABLE     J  CREATE TABLE public.products (
    id bigint NOT NULL,
    name character varying(255),
    description character varying(255),
    price integer,
    stock integer,
    photo character varying(255),
    user_id bigint,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    photo_public_id text
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    16461    products_id_seq    SEQUENCE     x   CREATE SEQUENCE public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          postgres    false    217            6           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    216            �            1259    16476    profiles    TABLE     �   CREATE TABLE public.profiles (
    id bigint NOT NULL,
    phone character varying(255),
    address text,
    user_id bigint,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);
    DROP TABLE public.profiles;
       public         heap    postgres    false            �            1259    16475    profiles_id_seq    SEQUENCE     x   CREATE SEQUENCE public.profiles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.profiles_id_seq;
       public          postgres    false    219            7           0    0    profiles_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.profiles_id_seq OWNED BY public.profiles.id;
          public          postgres    false    218            �            1259    16507    transactions    TABLE     n  CREATE TABLE public.transactions (
    id bigint NOT NULL,
    user_id bigint,
    name character varying(50),
    email character varying(50),
    phone character varying(50),
    address text,
    status character varying(25),
    total_quantity integer,
    total_price integer,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);
     DROP TABLE public.transactions;
       public         heap    postgres    false            �            1259    16506    transactions_id_seq    SEQUENCE     |   CREATE SEQUENCE public.transactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.transactions_id_seq;
       public          postgres    false    223            8           0    0    transactions_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;
          public          postgres    false    222            �            1259    16453    users    TABLE       CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255),
    email character varying(255),
    password character varying(255),
    role character varying(255),
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16452    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    215            9           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    214            �           2604    19045    cart_to_transactions id    DEFAULT     �   ALTER TABLE ONLY public.cart_to_transactions ALTER COLUMN id SET DEFAULT nextval('public.cart_to_transactions_id_seq'::regclass);
 F   ALTER TABLE public.cart_to_transactions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    224            �           2604    16493    carts id    DEFAULT     d   ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);
 7   ALTER TABLE public.carts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221                       2604    16465    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            �           2604    16479    profiles id    DEFAULT     j   ALTER TABLE ONLY public.profiles ALTER COLUMN id SET DEFAULT nextval('public.profiles_id_seq'::regclass);
 :   ALTER TABLE public.profiles ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            �           2604    16510    transactions id    DEFAULT     r   ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);
 >   ALTER TABLE public.transactions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            ~           2604    16456    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            ,          0    16520    cart_to_transactions 
   TABLE DATA           �   COPY public.cart_to_transactions (product_id, product_name, product_photo, product_price, order_quantity, transaction_id, id) FROM stdin;
    public          postgres    false    224   �;       )          0    16490    carts 
   TABLE DATA           e   COPY public.carts (id, user_id, product_id, order_qty, subtotal, created_at, updated_at) FROM stdin;
    public          postgres    false    221   �;       %          0    16462    products 
   TABLE DATA           �   COPY public.products (id, name, description, price, stock, photo, user_id, created_at, updated_at, photo_public_id) FROM stdin;
    public          postgres    false    217   <       '          0    16476    profiles 
   TABLE DATA           W   COPY public.profiles (id, phone, address, user_id, created_at, updated_at) FROM stdin;
    public          postgres    false    219   O=       +          0    16507    transactions 
   TABLE DATA           �   COPY public.transactions (id, user_id, name, email, phone, address, status, total_quantity, total_price, created_at, updated_at) FROM stdin;
    public          postgres    false    223   �=       #          0    16453    users 
   TABLE DATA           X   COPY public.users (id, name, email, password, role, created_at, updated_at) FROM stdin;
    public          postgres    false    215   �=       :           0    0    cart_to_transactions_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.cart_to_transactions_id_seq', 1, false);
          public          postgres    false    225            ;           0    0    carts_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.carts_id_seq', 4, true);
          public          postgres    false    220            <           0    0    products_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.products_id_seq', 4, true);
          public          postgres    false    216            =           0    0    profiles_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.profiles_id_seq', 1, false);
          public          postgres    false    218            >           0    0    transactions_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.transactions_id_seq', 1, false);
          public          postgres    false    222            ?           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 3, true);
          public          postgres    false    214            �           2606    16495    carts carts_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
       public            postgres    false    221            �           2606    16469    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    217            �           2606    16483    profiles profiles_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.profiles DROP CONSTRAINT profiles_pkey;
       public            postgres    false    219            �           2606    16514    transactions transactions_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_pkey;
       public            postgres    false    223            �           2606    16460    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            �           2606    16501    carts fk_carts_product    FK CONSTRAINT     {   ALTER TABLE ONLY public.carts
    ADD CONSTRAINT fk_carts_product FOREIGN KEY (product_id) REFERENCES public.products(id);
 @   ALTER TABLE ONLY public.carts DROP CONSTRAINT fk_carts_product;
       public          postgres    false    3207    217    221            �           2606    16496    carts fk_carts_user    FK CONSTRAINT     r   ALTER TABLE ONLY public.carts
    ADD CONSTRAINT fk_carts_user FOREIGN KEY (user_id) REFERENCES public.users(id);
 =   ALTER TABLE ONLY public.carts DROP CONSTRAINT fk_carts_user;
       public          postgres    false    3205    215    221            �           2606    16470    products fk_products_user    FK CONSTRAINT     x   ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_products_user FOREIGN KEY (user_id) REFERENCES public.users(id);
 C   ALTER TABLE ONLY public.products DROP CONSTRAINT fk_products_user;
       public          postgres    false    215    3205    217            �           2606    16484    profiles fk_profiles_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT fk_profiles_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;
 C   ALTER TABLE ONLY public.profiles DROP CONSTRAINT fk_profiles_user;
       public          postgres    false    219    3205    215            �           2606    16525 )   cart_to_transactions fk_transactions_cart    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_to_transactions
    ADD CONSTRAINT fk_transactions_cart FOREIGN KEY (transaction_id) REFERENCES public.transactions(id);
 S   ALTER TABLE ONLY public.cart_to_transactions DROP CONSTRAINT fk_transactions_cart;
       public          postgres    false    223    224    3213            �           2606    16515 !   transactions fk_transactions_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_transactions_user FOREIGN KEY (user_id) REFERENCES public.users(id);
 K   ALTER TABLE ONLY public.transactions DROP CONSTRAINT fk_transactions_user;
       public          postgres    false    215    223    3205            ,      x������ � �      )   a   x�}�1� ��YN��h�Z=K��j:4&�00��4 �X�9�(����ɦ�P�����|�j��:K���|�v�lP6���Zf���HW&�2"(�      %   /  x��лj�0�Yz��%����X(�:t.9�i|�m%���iI��[�@����C�Wfn��]٢�s@�����ncJߒݱ
Y^�f ���Y��p�]O���=��r=3m��J�^�Ц��_O��i ���4���#6r���a��%`�R`�W0G/��5nn���*�/T�R5�r+���J�d�{��T�L�J뭙J��j�9���x�Ng���z?�X�y��Cz~lb�HdAA� ���X���Wu~�MF~�e3�����0H|��s��V1"��;�?ҵ
�F0�g      '   M   x�5�1
� D�z���̎&��FHH��~^�)�Ɲ��^ϵ���/��JG�{�`I	-Xw���z����3��><�      +      x������ � �      #     x�}�KO�@E���p��0�o�ϕB+I����S��EQ�����&n�]���C�0.��Y
���P(,�M��nT���Q1�g�3�'UW�,�h��k�o�E2�_��M(?��$`Cb	�Qb؄#nZ�{b�OUP�6i~�/�|ǹ�K�ն=�
k�z��qHW�G'J�I,����<l-,v�T�����ڌ#�t�h�醪L)DT�ɵ�^���,�ґ���]�:����4��a��q�6�l���3F�d"�{�60�r�F@���Q�����z�     