import jsonwebtoken from "jsonwebtoken";

export default function isAdmin(req, res, next) {
  console.log("Cabeçalhos recebidos:", req.headers);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extrai o token do header
  
  console.log("Token recebido:", token); // Debug do token recebido
  
  if (!token) {
    return res.status(401).send("Access token não informado");
  }

  try {
    // Verifica e decodifica o token
    const decoded = jsonwebtoken.verify(token, "segredo");
    console.log("Token decodificado:", decoded); // Debug do conteúdo do token

    // Verifica se o usuário é administrador
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Acesso negado. Usuário não é administrador." });
    }

    req.user = decoded; // Adiciona o usuário decodificado ao request
    next(); // Permite que a requisição continue
  } catch (err) {
    console.error("Erro ao verificar o token:", err);
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
}