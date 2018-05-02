1°  Souci avec les images = dans le rendu la premiere que je charge s'affiche sur tous les articles, meme ceux n'ayant pas d'image -  mais ca reste bon dans le DEBUG

2° plus d'aperçu des images dans le dépôt article

3° un peu le même souci avec le dépot d'image

- mettre le fond jaune en plein écran

//////////////

- créer la classe dragme

- rendre les fenetres du rendu flottantes et positionnées aléatoirement dans un "cadre"

+ onclick : fonction remplaçant le sous-titre par le chapo puis en deuxieme onclick, remplaçant le chapo par le contenu (le titre reste)

/////////////

- La typo OCL

- Créer des profils administrateur / utilisateur (permettre de relire et valider en deux temps)

- Instaurer une limite de caractères

1 - Propulser sur inspira.fr ? utiliser meteor galaxy ? $$$

- Sécurité : Créer les comptes autorisés puis bloquer la création de nouveaux comptes

- Cacher l'interface de connexion et la ligne de texte lorsqu'on est sur le rendu

- Suppr le bouton "ajouter une image" en double

- Créer des archives, des "captures d'écran" de l'état du site à horaire/Date fixe
- Archiver/Vider tous les jours à 8h ?

- Pouvoir se connecter avec la barre espace (submit)

- changer les accents en non-accents pour le H2

<?PHP
function enleveaccents($param)
{
        $param= strtr($param,
          "ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ",
           "aaaaaaaaaaaaooooooooooooeeeeeeeecciiiiiiiiuuuuuuuuynn");
        return $param;
}

$chaine = 'éééééé';
$chaine = enleveaccents($chaine);
echo $chaine;
?>

$unwanted_array = array(    'Š'=>'S', 'š'=>'s', 'Ž'=>'Z', 'ž'=>'z', 'À'=>'A', 'Á'=>'A', 'Â'=>'A', 'Ã'=>'A', 'Ä'=>'A', 'Å'=>'A', 'Æ'=>'A', 'Ç'=>'C', 'È'=>'E', 'É'=>'E',
                            'Ê'=>'E', 'Ë'=>'E', 'Ì'=>'I', 'Í'=>'I', 'Î'=>'I', 'Ï'=>'I', 'Ñ'=>'N', 'Ò'=>'O', 'Ó'=>'O', 'Ô'=>'O', 'Õ'=>'O', 'Ö'=>'O', 'Ø'=>'O', 'Ù'=>'U',
                            'Ú'=>'U', 'Û'=>'U', 'Ü'=>'U', 'Ý'=>'Y', 'Þ'=>'B', 'ß'=>'Ss', 'à'=>'a', 'á'=>'a', 'â'=>'a', 'ã'=>'a', 'ä'=>'a', 'å'=>'a', 'æ'=>'a', 'ç'=>'c',
                            'è'=>'e', 'é'=>'e', 'ê'=>'e', 'ë'=>'e', 'ì'=>'i', 'í'=>'i', 'î'=>'i', 'ï'=>'i', 'ð'=>'o', 'ñ'=>'n', 'ò'=>'o', 'ó'=>'o', 'ô'=>'o', 'õ'=>'o',
                            'ö'=>'o', 'ø'=>'o', 'ù'=>'u', 'ú'=>'u', 'û'=>'u', 'ý'=>'y', 'þ'=>'b', 'ÿ'=>'y' );
$str = strtr( $str, $unwanted_array );
